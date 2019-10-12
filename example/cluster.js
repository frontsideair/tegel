const cluster = require("cluster");
const express = require("express");
const FileStorage = require("../storage/file");
const Tgl = require("../lib");
const numCPUs = 4;

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
const storage = new FileStorage("/tmp/toggles.json");
const tgl = new Tgl({ toggles, storage });

const app = express();

app.use(tgl.middleware());

app.get("/", async (req, res) => {
  const universal = await req.tgl.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", tgl.router());

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(3000, () => console.log("Example app listening on port 3000!"));

  console.log(`Worker ${process.pid} started`);
}
