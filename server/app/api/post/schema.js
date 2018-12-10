let yup = require('yup')
let { yupISODate } = require('../../util')

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

  favoritesCount: yup.number()
    .required()
    .default(0),

  createdAt: yupISODate(),
  updatedAt: yupISODate(),
})
  .noUnknown()
