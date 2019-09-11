const express = require("express");
const MemoryStorage = require("../storage/memory");
const Tgl = require("../lib");

const toggles = [
  {
    name: "universal",
    description: "Do we address the world, or the whole universe?",
    default: false
  },
  {
    name: "lasers",
    description: "Enable lasers!!!",
    default: true
  }
];
const storage = new MemoryStorage();
const tgl = new Tgl({ toggles, storage });

const app = express();

app.get("/", async (req, res) => {
  const universal = await tgl.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", tgl.router());

module.exports = app;
