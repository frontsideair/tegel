function li({ name, defaultValue, description }, value) {
  const checked = value ? "checked" : "";
  return `<li><label><input type="checkbox" name="${name}" id="${name}" ${checked}> ${description} (${name})</label></li>`;
}

module.exports = function(toggles) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <form method="post">
      <ul>
        ${toggles.map(([toggle, value]) => li(toggle, value)).join("")}
      </ul>
      <button type="submit">Save</button>
    </form>
  </body>
</html>`;
};
