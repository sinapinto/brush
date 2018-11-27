const Router = require('koa-router')
const router = new Router()

router.post('/user/login', ctx => {
    ctx.status = 200
    ctx.type = 'json'
    ctx.body = { ay: 'lmao' }
})

router.get('/user', ctx => {
})

router.post('/user', ctx => {
})

router.put('/user', ctx => {
})

module.exports = router.routes()
