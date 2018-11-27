const auth = require('../middleware/authMiddleware')
const user = require('../controllers/userController')
const Router = require('koa-router')
const router = new Router()

router.post('/users/login', user.login)
router.post('/users', user.create)

router.get('/user', auth, user.getCurrent)
router.put('/user', auth, user.update)

module.exports = router.routes()
