const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(require("./middleware").middleware);

const { HTTP_STATUS_CODE } = require("./common/constants").constants;

if (process.env.NODE_ENV === "production") {
  const rootDir = path.join(__dirname, "..", "build");
  const indexPath = path.join(rootDir, "index.html");
  const indexHtml = fs
    .readFileSync(indexPath, "utf8")
    .replace(/%ORIGIN%/g, process.env.ORIGIN)
    .replace(/%GA_TRACKING_ID%/g, process.env.GA_TRACKING_ID);

  fs.writeFileSync(indexPath, indexHtml, "utf8");
  app.use(express.static(rootDir));
}

app.use("*", (req, res) =>
  res.status(HTTP_STATUS_CODE.OK).send("You went wrong.")
);

app.listen(process.env.PORT || 4000);
