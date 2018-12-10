let auth = require('../../middleware/authMiddleware')
let ctrl = require('./controller')
let Router = require('koa-router')
let router = new Router()

router.param('username', ctrl.byUsername)

router.get('/profiles/:username', ctrl.get)
router.post('/profiles/:username/follow', auth, ctrl.follow)
router.del('/profiles/:username/follow', auth, ctrl.unfollow)

module.exports = router.routes()
