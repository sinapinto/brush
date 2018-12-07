exports.omit = (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) return acc;
    return { ...acc, [key]: obj[key] };
  }, {});
}

exports.pick = (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) return acc;
    return { ...acc, [key]: obj[key] };
  }, {});
}
