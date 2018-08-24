const { Router } = require("express");
const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);
const asyncHandler = require("express-async-handler");
const path = require("path");

const router = Router();
const {
  VTV_GIAI_TRI_URL,
  VTV_GIAI_TRI_API_PATH,
  TITLE_URL_PATTERN,
  TITLE_ID_PATTERN,
  ENCRYPTION_KEY_PATTERN,
  GENRE,
  DATA_UPDATE_ALLOWED_IPS,
  HTTP_STATUS_CODE
} = require("./common/constants").constants;
const { getSortedTitles } = require("./common/helpers").helpers;
const fs = require("./common/promisified-fs").promisifiedFs;
const dataDir = path.join(__dirname, "data");

router.post(
  "/api/grabber",
  asyncHandler(async (req, res) => {
    if (!TITLE_URL_PATTERN.test(req.body.titleUrl)) {
      res.status(HTTP_STATUS_CODE.OK).send({ encryptionKey: "", episodes: [] });

      return;
    }

    try {
      const html = await (await fetch(req.body.titleUrl)).text();
      const titleIdMatch = html.match(TITLE_ID_PATTERN);

      if (titleIdMatch === null) {
        res
          .status(HTTP_STATUS_CODE.OK)
          .send({ encryptionKey: "", episodes: [] });

        return;
      }

      const titleId = titleIdMatch.groups.id;
      const titleData = await (await fetch(
        `${VTV_GIAI_TRI_URL}${VTV_GIAI_TRI_API_PATH}/title/${titleId}/season/${titleId}`
      )).json();
      const playlistData = await (await fetch(
        titleData.data.episodes[0].files[0].url
      )).text();
      const encryptionKey = playlistData.match(ENCRYPTION_KEY_PATTERN).groups
        .encryptionKey;

      res
        .status(HTTP_STATUS_CODE.OK)
        .send({ encryptionKey, episodes: titleData.data.episodes });
    } catch (ex) {
      res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  })
);

router.get(
  "/api/titles",
  asyncHandler(async (req, res) => {
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
  })
);

router.post(
  "/api/titles",
  asyncHandler(async (req, res) => {
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
  })
);

exports.routes = router;
