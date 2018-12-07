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

    } else if (err.code === 'SQLITE_CONSTRAINT') {
      debug(err.message)
      ctx.status = 422
      ctx.body = { errors: {} }

      if (err.errno === 19) { // UNIQUE constraint failed
        let idx = err.message.lastIndexOf('.')
        if (idx !== -1) {
          let path = err.message.slice(idx + 1)
          ctx.body.errors[path] = [`${path} has already been taken`]
        }
      }

    } else {
      debug(err.message, err.errno)
      ctx.status = 422
      ctx.body = { errors: {} }
    }
  }
}

module.exports =  errorMiddleware
