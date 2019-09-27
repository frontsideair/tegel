var express = require("express");
var bodyParser = require("body-parser");
var view = require("./view");

class Tgl {
  constructor({ toggles, storage }) {
    this._toggles = toggles;
    this._storage = storage;
  }

  router() {
    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get("/", async (req, res) => {
      const toggles = await this.toggles();
      res.send(view(toggles));
    });

    app.post("/", async (req, res) => {
      for (const { name } of this._toggles) {
        await this.set(name, req.body[name] === "on" ? true : false);
      }
      const toggles = await this.toggles();
      res.send(view(toggles));
    });

    return app;
  }

  middleware() {
    return (req, res, next) => {
      req.tgl = this;
      next();
    };
  }

  async set(key, value) {
    return this._storage.set(key, value);
  }

  async get(key) {
    const value = await this._storage.get(key);
    return value !== undefined
      ? value
      : this._toggles.find(toggle => toggle.name === key).default;
  }

  async toggles() {
    const toggles = [];
    for (const toggle of this._toggles) {
      const value = await this.get(toggle.name);
      toggles.push({ ...toggle, value });
    }
    return toggles;
  }
}

module.exports = Tgl;
