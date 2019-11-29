const fromEntries =
  Object.fromEntries ||
  (entries => {
    const object = {};
    for (const [key, value] of entries) {
      object[key] = value;
    }
    return object;
  });

module.exports = fromEntries;
