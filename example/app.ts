import express, { Express } from "express";
import Keyv from "keyv";
import { Tgl, middleware, router, Toggle } from "tgl";

const toggles: Toggle[] = [
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
const storage: Keyv<boolean> = new Keyv();
const tgl: Tgl = new Tgl({ toggles, storage });

tgl.get("hello");
tgl.set("hello", true);

const app: Express = express();

app.use(middleware(tgl));

app.get("/", (req, res) => {
  const universal = req.tgl.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", router(tgl));

module.exports = app;
