exports.getSelect = (table, prefix, fields) => {
  return fields.map(f => `${table}.${f} as ${prefix}_${f}`)
}

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
