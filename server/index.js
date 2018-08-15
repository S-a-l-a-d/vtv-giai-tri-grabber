const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const app = express();
const dotenv = require("dotenv");
const rootDir = path.join(__dirname, "..", "build");

fs.readFileAsync = util.promisify(fs.readFile);
dotenv.config();

app.use(require("./middleware").default);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(rootDir, { index: false }));
}

app.get("/", async (req, res) => {
  try {
    const indexHtml = (await fs.readFileAsync(
      path.join(rootDir, "index.html"),
      "utf8"
    ))
      .replace("%CSRF_TOKEN%", res.locals._csrf)
      .replace(/%GA_TRACKING_ID%/g, process.env.GA_TRACKING_ID);

    res.status(200).send(indexHtml);
  } catch (ex) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT || 4000);
