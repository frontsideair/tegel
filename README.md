# tgl

`tgl` is a simple feature toggle service for Node.js. It's local to the project and comes with a simple UI.

# Usage

```javascript
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

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

# Roadmap

- [ ] Prettier UI
- [ ] Include middleware for setting feature flags using query params
- [ ] Support enum flags
