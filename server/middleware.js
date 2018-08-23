const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const session = require("express-session");
const lusca = require("lusca");
const express = require("express");
const app = express();

const routes = require("./routes").routes;

app.use(cors({ origin: process.env.ORIGIN, methods: "GET,POST" }));
app.use(bodyParser.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
  })
);
app.use(
  lusca({
    nosniff: true,
    referrerPolicy: "same-origin",
    xframe: "DENY",
    xssProtection: true
  })
);
app.use(compression());
app.use(routes);

exports.middleware = app;
