# tgl

`tgl` is a simple feature toggle service for Node.js. It's local to the project and comes with a simple UI.

# Usage

```javascript
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
```

# Roadmap

- [ ] Use `express-session` compatible stores
- [ ] Prettier UI
- [ ] Include middleware for setting feature flags using query params
- [ ] Support enum flags
