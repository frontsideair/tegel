var express = require("express");
var bodyParser = require("body-parser");

function setup(store) {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));

  app.set("views", __dirname + "/views");
  app.set("view engine", "hbs");

  app.get("/", function(req, res) {
    res.render("index", { store });
  });

  app.post("/", function(req, res) {
    Object.entries(store).forEach(([key, value]) => {
      store[key] = req.body[key] ? true : false;
    });
    res.render("index", { store });
  });

  return app;
}

module.exports = setup;
