module.exports  = {

  // POST /api/users/login
  async login(ctx) {
  },

  // POST /api/users
  async create(ctx) {
  },

  // GET /api/user
  async getCurrent(ctx) {
    let users = await ctx.db('users').select()
    ctx.status = 200
    ctx.type = 'json'
    ctx.body = { users }
  },

  // PUT /api/user
  async update(ctx) {
  },

}
