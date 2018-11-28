let yup = require('yup')
let timeStampSchema = require('./timestampSchema')

module.exports = yup.object().shape({
  id: yup.string(),

  username: yup.string()
    .required()
    .max(30)
    .default('')
    .trim(),

  password: yup.string()
    .when('$validatePassword', {
      is: true,
      then: yup.string().required().min(4).max(30)
    }),

  bio: yup.string()
    .default('')
    .trim(),

  avatar: yup.string()
    .url()
    .default('')
    .trim(),

})
  .noUnknown()
  .concat(timeStampSchema)
