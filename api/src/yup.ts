import * as yup from 'yup'

export let userSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .max(30),

  password: yup
    .string()
    .required()
    .min(4)
    .max(100),

  bio: yup.string().max(100),

  avatar: yup.string().url(),
})
