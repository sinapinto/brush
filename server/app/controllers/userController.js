let uuid = require('uuid')
let bcrypt = require('bcrypt')
let { omit } = require('../util')

module.exports  = {
  // POST /api/users/login
  async login(ctx) {
  },

  // POST /api/users
  async post(ctx) {
    let { user = {} } = ctx.request.body
    user.id = uuid()
    user = await ctx.schemas.user.validate(user, { abortEarly: false, context: { validatePassword: true } })
    user.password = await bcrypt.hash(user.password, 10)
    await ctx.db('users').insert(user)
    ctx.body = { user: omit(user, ['password']) }
  },

  // GET /api/user
  async get(ctx) {
    let users = await ctx.db('users').select()
    ctx.body = { users }
  },

  // PUT /api/user
  async put(ctx) {
  },
}
