let auth = require('../middleware/authMiddleware')
let profile = require('../controllers/profileController')
let Router = require('koa-router')
let router = new Router()

router.param('username', profile.byUsername)

router.get('/profiles/:username', profile.get)
router.post('/profiles/:username/follow', auth, profile.follow.post)
router.del('/profiles/:username/follow', auth, profile.follow.del)

module.exports = router.routes()
