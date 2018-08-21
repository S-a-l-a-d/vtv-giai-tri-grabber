const express = require("express");
const path = require("path");
const fs = require("fs");
const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);
const app = express();
const dotenv = require("dotenv");

const {
  VTV_GIAI_TRI_URL,
  VTV_GIAI_TRI_API_PATH,
  TITLE_URL_PATTERN,
  TITLE_ID_PATTERN,
  ENCRYPTION_KEY_PATTERN
} = require("./constants").constants;
const rootDir = path.join(__dirname, "..", "build");

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(require("./middleware").middleware);

if (process.env.NODE_ENV === "production") {
  const indexPath = path.join(rootDir, "index.html");
  const indexHtml = fs
    .readFileSync(indexPath, "utf8")
    .replace(/%ORIGIN%/g, process.env.ORIGIN)
    .replace(/%GA_TRACKING_ID%/g, process.env.GA_TRACKING_ID);

  fs.writeFileSync(indexPath, indexHtml, "utf8");
  app.use(express.static(rootDir));
}

app.post("/api/grabber", async (req, res) => {
  if (!TITLE_URL_PATTERN.test(req.body.titleUrl)) {
    res.status(200).send({ encryptionKey: "", episodes: [] });

    return;
  }

  try {
    const html = await (await fetch(req.body.titleUrl)).text();
    const titleIdMatch = html.match(TITLE_ID_PATTERN);

    if (titleIdMatch === null) {
      res.status(200).send({ encryptionKey: "", episodes: [] });

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

    res.status(200).send({ encryptionKey, episodes: titleData.data.episodes });
  } catch (ex) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT || 4000);
