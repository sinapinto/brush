let Router = require('koa-router')
let router = new Router({ prefix: '/api' })

router.use(require('./userRouter'))
router.use(require('./profileRouter'))

module.exports = router
