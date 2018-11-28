let yup = require('yup')

module.exports = yup.object().shape({
  createdAt: yup.string()
    .required()
    .transform(function (value) {
      return this.isType(value) && value !== null
        ? new Date(value).toISOString()
        : value
    })
    .default(() => new Date().toISOString()),

  updatedAt: yup.string()
    .required()
    .transform(function (value) {
      return this.isType(value) && value !== null
        ? new Date(value).toISOString()
        : value
    })
    .default(() => new Date().toISOString())
})
  .noUnknown()
