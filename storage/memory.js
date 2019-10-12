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
      async *[Symbol.asyncIterator]() {
        yield* keys;
      }
    };
  }

  values() {
    const values = this._store.values();
    return {
      async *[Symbol.asyncIterator]() {
        yield* values;
      }
    };
  }

  entries() {
    const entries = this._store.entries();
    return {
      async *[Symbol.asyncIterator]() {
        yield* entries;
      }
    };
  }
}

module.exports = MemoryStorage;
