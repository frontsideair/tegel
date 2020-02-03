function toObject(array) {
  const object = {};
  for (const [key, value] of array) {
    object[key] = value;
  }
  return object;
}

class Tegel {
  constructor({ toggles, storage, interval = 1000 }) {
    Object.freeze(toggles);
    toggles.forEach(toggle => Object.freeze(toggle));
    this.toggles = toggles;
    this._storage = storage;
    this._defaults = toObject(
      toggles.map(toggle => [toggle.name, toggle.defaultValue])
    );
    this._cache = {};
    this._timer = setInterval(this._populateCache.bind(this), interval);
    this._populateCache();
  }

  async _populateCache() {
    const cache = await Promise.all(
      this.toggles.map(toggle =>
        this._storage.get(toggle.name).then(value => [toggle.name, value])
      )
    );

    this._cache = toObject(cache);
  }

  async set(key, value) {
    this._cache[key] = value;
    return this._storage.set(key, value);
  }

  get(key) {
    return this._cache.hasOwnProperty(key)
      ? this._cache[key]
      : this._defaults[key];
  }
}

function middleware(tegel) {
  return (req, res, next) => {
    req.tegel = tegel;
    next();
  };
}

module.exports = { Tegel, middleware };
