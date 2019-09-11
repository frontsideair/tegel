class MemoryStorage {
  constructor(store = new Map()) {
    this._store = store;
  }

  async set(key, value) {
    return this._store.set(key, value);
  }

  async get(key) {
    return this._store.get(key);
  }

  async delete(key) {
    return this._store.delete(key);
  }

  async clear() {
    return this._store.clear();
  }

  keys() {
    const keys = this._store.keys();
    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            return keys.next();
          }
        };
      }
    };
  }

  values() {
    const values = this._store.values();
    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            return values.next();
          }
        };
      }
    };
  }

  entries() {
    const entries = this._store.entries();
    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            return entries.next();
          }
        };
      }
    };
  }
}

module.exports = MemoryStorage;
