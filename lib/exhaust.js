async function exhaust(asyncIterator) {
  const result = [];
  for await (const item of asyncIterator) {
    result.push(item);
  }
  return result;
}

module.exports = exhaust;
