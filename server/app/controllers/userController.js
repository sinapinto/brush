let uuid = require('uuid')
let bcrypt = require('bcrypt')
let { omit } = require('../util')

module.exports  = {
  // POST /users/login
  async login(ctx) {
    let { user = {} } = ctx.request.body
    if (!user.username || !user.password) {
      ctx.throw(422, 'Invalid username or password', { path: 'unknown' })
    }
    let cand = await ctx.db('users').first().where('username', user.username)
    if (!cand || !(await bcrypt.compare(user.password, cand.password))) {
      ctx.throw(422, 'Invalid username or password', { path: 'unknown' })
    }
    ctx.session.userId = cand.id
    ctx.body = { user: omit(cand, ['password']) }
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
