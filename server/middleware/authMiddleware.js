async function authMiddleware(ctx, next) {
  if (!ctx.user) {
    ctx.throw(401)
  }
}

module.exports = authMiddleware
