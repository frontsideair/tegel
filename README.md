# tegel

`tegel` is a simple feature toggle service for Node.js. It's local to the project and comes with a simple UI.

# Usage

You need to initialize `tegel` with a list of existing toggles and a store that has an async `Map` interface, like [Keyv](https://github.com/lukechilds/keyv).

```javascript
const express = require("express");
const Keyv = require("keyv");
const { Tegel, middleware, router } = require("@tegel/core");

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

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```
