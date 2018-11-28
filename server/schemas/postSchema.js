let yup = require('yup')
let timeStampSchema = require('./timestampSchema')

module.exports = yup.object().shape({
  id: yup.string(),

  author: yup.string(),

  slug: yup.string()
    .trim(),

  title: yup.string()
    .required()
    .trim(),

  body: yup.string()
    .required()
    .trim(),

  description: yup.string()
    .required()
    .trim(),

  favoritesCount: yup.number()
    .required()
    .default(0),
})
  .noUnknown()
  .concat(timeStampSchema)
