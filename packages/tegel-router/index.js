var express = require("express");
var bodyParser = require("body-parser");
var view = require("./view");

function router(tegel) {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));

  function toggleData() {
    return tegel.toggles.map(toggle => [toggle, tegel.get(toggle.name)]);
  }

  app.get("/", async (req, res) => {
    res.send(view(toggleData()));
  });

  app.post("/", async (req, res) => {
    await Promise.all(
      tegel.toggles.map(toggle =>
        tegel.set(toggle.name, req.body[toggle.name] === "on" ? true : false)
      )
    );
    res.send(view(toggleData()));
  });

  return app;
}

module.exports = router;
