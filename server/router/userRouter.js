const auth = require('../middleware/authMiddleware')
const ctrl = require('../controllers')
const Router = require('koa-router')
const router = new Router()

router.post('/users/login', ctrl.user.login)
router.post('/users', ctrl.user.create)

router.get('/user', auth, ctrl.user.get)
router.put('/user', auth, ctrl.user.update)

module.exports = router.routes()
