let auth = require('../../middleware/authMiddleware')
let ctrl = require('./controller')
let Router = require('koa-router')
let router = new Router()

router.param('slug', ctrl.bySlug)

router.get('/posts', ctrl.list)
router.post('/posts', auth, ctrl.create)

router.get('/posts/:slug', ctrl.detail)
router.put('/posts/:slug', auth, ctrl.update)
router.del('/posts/:slug', auth, ctrl.delete)

router.post('/posts/:slug/favorite', auth, ctrl.favorite)
router.del('/posts/:slug/favorite', auth, ctrl.unfavorite)

module.exports = router.routes()
