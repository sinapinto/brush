let Router = require('koa-router')
let router = new Router({ prefix: '/api' })

router.use(require('./userRouter'))

module.exports = router
