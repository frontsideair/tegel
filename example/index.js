const express = require("express");
const tgl = require("../lib");

const toggles = {
  universal: false,
  lasers: true
};

const app = express();

app.get("/", (req, res) =>
  res.send(toggles.universal ? "Hello, universe!" : "Hello world!")
);

app.use("/tgl", tgl(toggles));

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
