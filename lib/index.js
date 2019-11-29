var express = require("express");
var bodyParser = require("body-parser");
var fromEntries = require("./fromEntries");
var view = require("./view");

class Tgl {
  constructor({ toggles, storage, interval = 1000 }) {
    this.toggles = toggles;
    this._storage = storage;
    this._cache = {};
    this._defaults = fromEntries(
      toggles.map(toggle => [toggle.name, toggle.default])
    );
    this._timer = setInterval(this._populateCache.bind(this), interval);
    this._populateCache();
  }

  async _populateCache() {
    const cache = await Promise.all(
      this.toggles.map(toggle =>
        this._storage
          .get(toggle.name)
          .then(value => [
            toggle.name,
            value === undefined ? toggle.default : value
          ])
      )
    );

    this._cache = fromEntries(cache);
  }

  async set(key, value) {
    this._cache[key] = value;
    return this._storage.set(key, value);
  }

  get(key) {
    const value = this._cache[key];
    return value === undefined ? this._defaults[toggle.name] : value;
  }
}

function middleware(tgl) {
  return (req, res, next) => {
    req.tgl = tgl._cache;
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
