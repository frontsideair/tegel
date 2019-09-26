# tgl

`tgl` is a simple feature toggle service for Node.js. It's local to the project and comes with a simple UI.

# Usage

You need to initialize `tgl` with a list of existing toggles and a [KV Storage](https://github.com/WICG/kv-storage) compliant store. Since it uses async iterators, only Node.js versions >=10.0.0 are supported.

```javascript
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

app.use(tgl.middleware());

app.get("/", async (req, res) => {
  const universal = await req.tgl.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", tgl.router());

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

# Roadmap

- [ ] Prettier UI
- [ ] Include middleware for setting feature flags using query params
- [ ] Support enum flags
