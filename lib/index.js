var express = require("express");
var bodyParser = require("body-parser");
var exhaust = require("./exhaust");

function setup(store) {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));

  app.set("views", __dirname + "/views");
  app.set("view engine", "hbs");

  app.get("/", async function(req, res) {
    const entries = await exhaust(store.entries());
    res.render("index", { store: entries });
  });

  app.post("/", async function(req, res) {
    for await (const key of store.keys()) {
      await store.set(key, req.body[key] === "on" ? true : false);
    }
    const entries = await exhaust(store.entries());
    res.render("index", { store: entries });
  });

  return app;
}

module.exports = setup;
