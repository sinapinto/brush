const path = require('path')
const Koa = require('koa')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
const mount = require('koa-mount')
const bodyparser = require('koa-bodyparser')
const debug = require('debug')('app')
const router = require('./router')
const db = require('./db')

const app = new Koa()

app.use(helmet())
app.use(logger())
app.use(bodyparser())

app.use(router.routes())

const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV || 'development'

app.context.db = db(ENV)

app.context.db.migrate.latest()
  .then(() => {
    app.listen(PORT)
    debug(`${ENV} server listening at http://localhost:${PORT}`)
  })
  .catch(console.error)
