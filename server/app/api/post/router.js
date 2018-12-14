let auth = require('../../middleware/authMiddleware')
let ctrl = require('./controller')
let Router = require('koa-router')
let router = new Router()

router.param('id', ctrl.byId)

router.get('/posts', ctrl.list)
router.post('/posts', auth, ctrl.create)

router.get('/posts/:id', ctrl.detail)
router.put('/posts/:id', auth, ctrl.update)
router.del('/posts/:id', auth, ctrl.delete)

router.post('/posts/:id/favorite', auth, ctrl.favorite)
router.del('/posts/:id/favorite', auth, ctrl.unfavorite)

module.exports = router.routes()
