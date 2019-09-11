const express = require("express");
const tgl = require("../lib");

const toggles = {
  universal: false,
  lasers: true
};

const app = express();

app.get("/", (req, res) =>
  res.send(toggles.universal ? "Hello, universe!" : "Hello, world!")
);

app.use("/tgl", tgl(toggles));

module.exports = app;
