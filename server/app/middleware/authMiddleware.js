async function authMiddleware(ctx, next) {
  ctx.assert(ctx.session.userId, 401)
  ctx.user = await ctx.db('users').first(
    'id',
    'username',
    'bio',
    'avatar',
    'createdAt',
    'updatedAt'
  ).where('id', ctx.session.userId)

  return next()
}

module.exports = authMiddleware
