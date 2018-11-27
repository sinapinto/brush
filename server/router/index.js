const userRouter = require('./userRouter')

const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

router.use(userRouter)

module.exports = router
