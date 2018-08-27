const { Router } = require("express");
const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);
const path = require("path");

const router = Router();
const {
  API_PATH,
  VTV_GIAI_TRI_URL,
  VTV_GIAI_TRI_API_PATH,
  ENCRYPTION_KEY_PATTERN,
  GENRE,
  DATA_UPDATE_ALLOWED_IPS,
  HTTP_STATUS_CODE
} = require("./common/constants").constants;
const { getSortedTitles } = require("./common/helpers").helpers;
const fs = require("./common/promisified-fs").promisifiedFs;
const dataDir = path.join(__dirname, "data");

router.get(`${API_PATH}/titles`, async (req, res) => {
  const genre = req.query.genre;

  if (Object.values(GENRE).indexOf(genre) === -1) {
    res.status(HTTP_STATUS_CODE.NO_CONTENT).send();

    return;
  }

  res
    .status(HTTP_STATUS_CODE.OK)
    .send(
      JSON.parse(
        await fs.readFileAsync(path.join(dataDir, `${genre}.json`), "utf8")
      )
    );
});

router.get(`${API_PATH}/titles/:titleId`, async (req, res) => {
  const genre = req.query.genre;
  let titleId = req.params.titleId;

  if (Object.values(GENRE).indexOf(genre) === -1 || isNaN(titleId)) {
    res.status(HTTP_STATUS_CODE.NO_CONTENT).send();

    return;
  }

  titleId = parseInt(titleId, 10);
  const data = JSON.parse(
    await fs.readFileAsync(path.join(dataDir, `${genre}.json`), "utf8")
  );

  res
    .status(HTTP_STATUS_CODE.OK)
    .send(data.find(title => title.id === titleId));
});

router.get(
  `${API_PATH}/titles/:titleId/seasons/:seasonId`,
  async (req, res) => {
    const titleId = req.params.titleId;
    const seasonId = req.params.seasonId;

    if (isNaN(titleId) || isNaN(seasonId)) {
      res.status(HTTP_STATUS_CODE.OK).send({ encryptionKey: "", episodes: [] });

      return;
    }

    const titleResponse = await (await fetch(
      `${VTV_GIAI_TRI_URL +
        VTV_GIAI_TRI_API_PATH}/title/${titleId}/season/${seasonId}`
    )).json();

    if (titleResponse.code !== HTTP_STATUS_CODE.OK) {
      res.status(HTTP_STATUS_CODE.OK).send({ encryptionKey: "", episodes: [] });

      return;
    }

    const playlistResponse = await (await fetch(
      titleResponse.data.episodes[0].files[0].url
    )).text();
    const encryptionKey = playlistResponse.match(ENCRYPTION_KEY_PATTERN).groups
      .encryptionKey;

    res
      .status(HTTP_STATUS_CODE.OK)
      .send({ encryptionKey, episodes: titleResponse.data.episodes });
  }
);

router.post(`${API_PATH}/titles`, async (req, res) => {
  const requestIp = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"].split(",")[0]
    : req.connection.remoteAddress;

  if (
    DATA_UPDATE_ALLOWED_IPS.indexOf(requestIp) === -1 &&
    process.env.NODE_ENV !== "development" &&
    requestIp !== "::1"
  ) {
    res.status(HTTP_STATUS_CODE.FORBIDDEN).send("Forbidden");

    return;
  }

  if (!(await fs.existsAsync(dataDir))) await fs.mkdirAsync(dataDir);

  const titleGroupsByGenre = await Promise.all(
    Object.values(GENRE).map(async genre => ({
      genre,
      titles: await getSortedTitles(genre, 1)
    }))
  );

  await Promise.all(
    titleGroupsByGenre.map(titleGroupByGenre =>
      fs.writeFileAsync(
        path.join(dataDir, `${titleGroupByGenre.genre}.json`),
        JSON.stringify(titleGroupByGenre.titles)
      )
    )
  );

  res.status(HTTP_STATUS_CODE.OK).send();
});

exports.routes = router;
