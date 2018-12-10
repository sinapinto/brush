let yup = require('yup')

exports.yupISODate = () => yup.string()
  .required()
  .transform(function (value) {
    return this.isType(value) && value !== null
      ? new Date(value).toISOString()
      : value
  })
  .default(() => new Date().toISOString())


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
