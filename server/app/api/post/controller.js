let uuid = require('uuid')
let slug = require('slug')
let { pick } = require('../../util')

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

  async list(ctx) {
    let { user } = ctx
    let posts = await ctx.db('posts')
      .select(
        ...['id', 'title', 'body', 'slug'].map(f => `posts.${f} as ${f}`),
        ...['id', 'username', 'avatar', 'bio', 'createdAt'].map(f => `users.${f} as author_${f}`),
        'favorites.id as favorited',
        'followers.id as author_following'
      )
      .orderBy('posts.createdAt', 'desc')
      .leftJoin('users', 'posts.author', 'users.id')
      .leftJoin('favorites', function () {
        this.on('posts.id', '=', 'favorites.post')
          .onIn('favorites.user', [user && user.id])
      })
      .leftJoin('followers', function () {
        this.on('posts.author', '=', 'followers.user')
          .onIn('followers.follower', [user && user.id])
      })

    // strip `author_` prefix from keys and move to `authors` property
    posts = posts.map((post) => {
      post = Object.entries(post).reduce((acc, [k, v]) => k.startsWith('author_') ? ({
        ...acc,
        author: { ...acc.author, [k.replace(/^author_/, '')]: v },
      }) : ({
        ...acc,
        [k]: v,
      }), { author: {} })
      post.favorited = Boolean(post.favorited)
      post.author.following = Boolean(post.author.following)
      return post
    })

    ctx.body = { posts }
  },

  async create(ctx) {
    let { post = {} } = ctx.request.body
    post.id = uuid()
    post.author = ctx.user.id
    post = await ctx.schemas.post.validate(post, { abortEarly: false })
    post.slug = slug(post.title, { lower: true })
    try {
      await ctx.db('posts').insert(post)
    } catch (err) {
      // slug already exists. append an id and retry
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

  async detail(ctx) {
    ctx.body = { post: ctx.post }
  },

  async update(ctx) {
  },

  async delete(ctx) {
  },

  async favorite(ctx) {
  },

  async unfavorite(ctx) {
  }
}
