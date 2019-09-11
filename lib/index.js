var express = require("express");
var bodyParser = require("body-parser");
var exhaust = require("./exhaust");

class Tgl {
  constructor({ toggles, storage }) {
    this._toggles = toggles;
    this._storage = storage;
  }

  router() {
    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    app.set("views", __dirname + "/views");
    app.set("view engine", "hbs");

    app.get("/", async (req, res) => {
      const toggles = await this.toggles();
      res.render("index", { toggles });
    });

    app.post("/", async (req, res) => {
      for (const { name } of this._toggles) {
        await this.set(name, req.body[name] === "on" ? true : false);
      }
      const toggles = await this.toggles();
      res.render("index", { toggles });
    });

    return app;
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
