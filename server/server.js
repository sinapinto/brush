const path = require('path')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
const mount = require('koa-mount')
const bodyparser = require('koa-bodyparser')
const debug = require('debug')('app')
const router = require('./router')

const Koa = require('koa')
const app = new Koa()

const PORT = process.env.PORT || 4000

app.use(helmet())
app.use(logger())

// store parsed body in `ctx.request.body`
app.use(bodyparser({ enableTypes: ['json'] }))

app.use(router.routes())

app.listen(PORT)
debug(`${process.env.NODE_ENV} server listening at http://localhost:${PORT}`)
