let uuid = require('uuid')
let { omit } = require('../../util')

module.exports  = {
  async byUsername(username, ctx, next) {
    ctx.assert(username, 404)
    ctx.profile = await ctx.db('users')
      .first(
        ...['id', 'username', 'avatar', 'bio', 'createdAt'].map(f => `users.${f} as ${f}`),
        'followers.id as following'
      )
      .where('username', username)
      .leftJoin('followers', function () {
        this.on('users.id', '=', 'followers.user')
          .onIn('followers.follower', [ctx.user && ctx.user.id])
      })
    ctx.assert(ctx.profile, 404)
    ctx.profile.following = ctx.profile.following || false
    return next()
  },

  // GET /profiles/:username
  async get(ctx) {
    ctx.body = { profile: ctx.profile }
  },

  async follow(ctx) {
    let { profile } = ctx
    if (profile.following || ctx.user.username === profile.username) {
      ctx.body = { profile }
      return
    }
    await ctx.db('followers').insert({
      id: uuid(),
      user: profile.id,
      follower: ctx.user.id,
    })
    profile.following = true
    ctx.body = { profile }
  },

  // DELETE /profiles/:username/follow
  async unfollow(ctx) {
    let { profile } = ctx
    if (!profile.following) {
      ctx.body = { profile }
      return
    }
    await ctx.db('followers')
      .where({ user: profile.id, follower: ctx.user.id })
      .del()
    profile.following = false
    ctx.body = { profile }
  },
}
