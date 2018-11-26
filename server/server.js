const path = require( 'path' )
const helmet = require('koa-helmet')
const logger = require( 'koa-logger' )
const mount = require( 'koa-mount' )
const bodyparser = require( 'koa-bodyparser' )
const debug = require('debug')('app')

const PORT = process.env.PORT || 4000

const Koa = require('koa')
const app = new Koa()

app.use(helmet())
app.use(logger())

// store parsed body in `this.request.body`
app.use(bodyparser({ enableTypes: ['json'] }))

app.use(mount('/api', async ctx => {
    ctx.status = 200
    ctx.type = 'json'
    ctx.body = { ay: 'lmao' }
}))

app.listen(PORT)
debug(`${process.env.NODE_ENV} server listening at http://localhost:${PORT}`)
