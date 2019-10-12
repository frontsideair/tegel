const fs = require("fs").promises;

const ENCODING = "utf-8";

class FileStorage {
  constructor(filename) {
    this._filename = filename;
  }

  async read() {
    const file = await fs.readFile(this._filename, ENCODING);
    return JSON.parse(file);
  }

  async write(json) {
    fs.writeFile(this._filename, JSON.stringify(json), ENCODING);
  }

  async set(key, value) {
    const json = await this.read();
    json[key] = value;
    await this.write(json);
    return undefined;
  }

  async get(key) {
    const json = await this.read();
    return json[key];
  }

  async delete(key) {
    const json = await this.read();
    delete json[key];
    await this.write(json);
    return undefined;
  }

  async clear() {
    await this.write({});
    return undefined;
  }

  keys() {
    const file = this.read();
    return {
      async *[Symbol.asyncIterator]() {
        const json = await file;
        yield* Object.keys(json)[Symbol.iterator]();
      }
    };
  }

  values() {
    const file = this.read();
    return {
      async *[Symbol.asyncIterator]() {
        const json = await file;
        yield* Object.values(json)[Symbol.iterator]();
      }
    };
  }

  entries() {
    const file = this.read();
    return {
      async *[Symbol.asyncIterator]() {
        const json = await file;
        yield* Object.entries(json)[Symbol.iterator]();
      }
    };
  }
}

module.exports = FileStorage;
