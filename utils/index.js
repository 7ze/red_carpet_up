function to(promise, errorExt) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined];
    });
}

module.exports = to;
