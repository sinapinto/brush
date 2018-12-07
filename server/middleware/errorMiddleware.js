let debug = require('debug')('app')

async function errorMiddleware(ctx, next) {
  try { 
    await next()
  } catch (err) {
    if (err.name === 'ValidationError') {
      debug(err.inner)
      ctx.status = 400
      let errors = err.inner.reduce((acc, cur) => ({
        ...acc,
        [cur.path]: cur.errors,
      }), {})
      ctx.body = { errors }
    } else {
      debug(err)
      ctx.status = 400
      ctx.body = { errors: {} }
    }
  }
}

module.exports =  errorMiddleware
