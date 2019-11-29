var express = require("express");
var bodyParser = require("body-parser");
var view = require("./view");

class Tgl {
  constructor({ toggles, storage, interval = 1000 }) {
    this.toggles = toggles;
    this._storage = storage;
    this._timer = setInterval(this._populateCache.bind(this), interval);
    this._populateCache();
  }

  async _populateCache() {
    const values = await Promise.all(
      this.toggles.map(toggle =>
        this._storage
          .get(toggle.name)
          .then(value => [
            toggle.name,
            value === undefined ? toggle.default : value
          ])
      )
    );
    this.values = Object.fromEntries(values);
  }

  async set(key, value) {
    this.values[key] = value;
    return this._storage.set(key, value);
  }

  get(key) {
    const value = this.values[key];
    return value === undefined
      ? this.toggles.find(toggle => toggle.name === key).default
      : value;
  }
}

function middleware(tgl) {
  return (req, res, next) => {
    req.tgl = tgl.values;
    next();
  };
}

function router(tgl) {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", async (req, res) => {
    const toggles = tgl.toggles.map(toggle => ({
      ...toggle,
      value: tgl.get(toggle.name)
    }));
    res.send(view(toggles));
  });

  app.post("/", async (req, res) => {
    await Promise.all(
      tgl.toggles.map(toggle =>
        tgl.set(toggle.name, req.body[toggle.name] === "on" ? true : false)
      )
    );
    const toggles = tgl.toggles.map(toggle => ({
      ...toggle,
      value: tgl.get(toggle.name)
    }));
    res.send(view(toggles));
  });

  return app;
}

module.exports = { Tgl, middleware, router };
