const express = require("express");
const Keyv = require("keyv");
const { Tegel, middleware } = require("tegel");
const router = require("tegel-router");

const toggles = [
  {
    name: "universal",
    description: "Do we address the world, or the whole universe?",
    defaultValue: false
  },
  {
    name: "lasers",
    description: "Enable lasers!!!",
    defaultValue: true
  }
];
const storage = new Keyv();
const tegel = new Tegel({ toggles, storage });

const app = express();

app.use(middleware(tegel));

app.get("/", (req, res) => {
  const universal = req.tegel.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tegel", router(tegel));

module.exports = app;
