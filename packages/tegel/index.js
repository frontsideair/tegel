class Tegel {
  constructor({ toggles, storage, interval = 1000 }) {
    this.toggles = toggles;
    this._storage = storage;
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

    for (const [key, value] of cache) {
      this._cache[key] = value;
    }
  }

  async set(key, value) {
    this._cache[key] = value;
    return this._storage.set(key, value);
  }

  get(key) {
    return this._cache.hasOwnProperty(key)
      ? this._cache[key]
      : this.toggles.find(toggle => toggle.name === key).defaultValue;
  }
}

function middleware(tegel) {
  return (req, res, next) => {
    req.tegel = tegel;
    next();
  };
}

module.exports = { Tegel, middleware };