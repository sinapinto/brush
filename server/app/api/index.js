let Router = require('koa-router')

module.exports = (app) => {
  app.context.schemas = {
    post: require('./post/schema'),
    user: require('./user/schema'),
  }

  let router = new Router({ prefix: '/api' })

  router.use(require('./post/router'))
  router.use(require('./user/router'))
  router.use(require('./profile/router'))

  return router.routes()
}
