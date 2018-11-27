async function authMiddleware(ctx, next) {
  if (!ctx.user) {
    // ctx.throw(401)
  }
  return next()
}

module.exports = authMiddleware
