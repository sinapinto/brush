let uuid = require('uuid')
let slug = require('slug')
let { pick } = require('../util')

module.exports = {
  async bySlug(slug, ctx, next) {
    let { user } = ctx
    ctx.assert(slug, 404)

    let post = await ctx.db('posts')
      .first()
      .where('slug', slug)
    ctx.assert(post, 404)

    let author = await ctx.db('user')
      .first('username', 'bio', 'avatar', 'id')
      .where('id', post.author)

    // is user following author?
    author.following = false
    if (user && user.username !== author.username) {
      let follow = await ctx.db('followers')
        .where({ user: post.author.id, follower: user.id })
        .select()
      if (follow.length) {
        author.following = true
      }
    }

    // has user favorited post?
    post.favorited = false
    let favorites = []
    if (user) {
      favorites = await ctx.db('favorites')
        .where({ user: user.id, post: post.id })
        .select()
      if (favorites.length) {
        post.favorited = true
      }
    }

    ctx.post = post
    ctx.post.author = author
    ctx.favorites = favorites
    return next()
  },

  // GET /posts
  async get(ctx) {
  },

  // POST /posts
  async post(ctx) {
    let { post = {} } = ctx.request.body
    post.id = uuid()
    post.author = ctx.user.id
    post = await ctx.schemas.post.validate(post, { abortEarly: false })
    post.slug = slug(post.title, { lower: true })
    try {
      await ctx.db('posts').insert(post)
    } catch (err) {
      // slug already exists. append an id
      if (err.errno === 19 || err.code === 23505) {
        article.slug = article.slug + '-' + uuid().slice(-6)
        await ctx.db('posts').insert(post)
      }
    }
    post.favorited = false
    post.author = pick(ctx.user, ['username', 'bio', 'image'])
    post.author.following = false
    ctx.body = { post }
  },

  // GET /posts/:slug
  async getOne(ctx) {
    ctx.body = { post: ctx.post }
  },

  // PUT /posts/:slug
  async put(ctx) {
  },

  // DELETE /posts/:slug
  async del(ctx) {
  },

  favorite: {
    // POST /posts/:slug/favorite
    async post(ctx) {
    },

    // DELETE /posts/:slug/favorite
    async del(ctx) {
    }
  },
}
