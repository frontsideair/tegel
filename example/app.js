const express = require("express");
const MemoryStorage = require("../storage/memory");
const tgl = require("../lib");

const toggles = new Map([["universal", false], ["lasers", true]]);
const storage = new MemoryStorage(toggles);

const app = express();

app.get("/", async (req, res) => {
  const universal = await storage.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", tgl(storage));

module.exports = app;
