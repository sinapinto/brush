let userRouter = require('./userRouter')

let Router = require('koa-router')
let router = new Router({ prefix: '/api' })

router.use(userRouter)

module.exports = router
