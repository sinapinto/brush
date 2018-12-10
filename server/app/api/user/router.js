let auth = require('../../middleware/authMiddleware')
let ctrl = require('./controller')
let Router = require('koa-router')
let router = new Router()

router.use(ctrl.postprocess)
router.post('/users/login', ctrl.login)
router.post('/users/logout', ctrl.logout)
router.post('/users', ctrl.create)

router.get('/user', auth, ctrl.get)
router.put('/user', auth, ctrl.update)

module.exports = router.routes()
