let auth = require('../middleware/authMiddleware')
let post = require('../controllers/postController')
let Router = require('koa-router')
let router = new Router()

router.param('slug', post.bySlug)

router.get('/posts', post.get)
router.post('/posts', auth, post.post)

router.get('/posts/:slug', post.getOne)
router.put('/posts/:slug', auth, post.put)
router.del('/posts/:slug', auth, post.del)

router.post('/posts/:slug/favorite', auth, post.favorite.post)
router.del('/posts/:slug/favorite', auth, post.favorite.del)

module.exports = router.routes()
