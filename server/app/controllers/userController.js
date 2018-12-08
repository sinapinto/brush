let uuid = require('uuid')
let bcrypt = require('bcrypt')
let { omit } = require('../util')

module.exports  = {
  // POST /users/login
  async login(ctx) {
    // let { user = {} } = ctx.request.body
    // user = await ctx.schemas.user.validate(user, { abortEarly: false })
    // user.password = await bcrypt.hash(user.password, 10)
    // await ctx.db('users').insert(user)
    // ctx.session.userId = user.id
    // ctx.body = { user: omit(user, ['password']) }
  },

  // POST /users/logout
  async logout(ctx) {
    ctx.session = null
    ctx.body = {}
  },

  // POST /users
  async post(ctx) {
    let { user = {} } = ctx.request.body
    user.id = uuid()
    user = await ctx.schemas.user.validate(user, { abortEarly: false, context: { validatePassword: true } })
    user.password = await bcrypt.hash(user.password, 10)
    await ctx.db('users').insert(user)
    ctx.session.userId = user.id
    ctx.body = { user: omit(user, ['password']) }
  },

  // GET /user
  async get(ctx) {
    ctx.body = { user: ctx.user }
  },

  // PUT /user
  async put(ctx) {
  },
}
