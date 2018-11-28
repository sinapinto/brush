let path = require('path')
let Koa = require('koa')
let helmet = require('koa-helmet')
let logger = require('koa-logger')
let mount = require('koa-mount')
let bodyparser = require('koa-bodyparser')
let debug = require('debug')('app')
let router = require('./router')
let db = require('./db')
let schemas = require('./schemas')

let app = new Koa()

app.use(helmet())
app.use(logger())
app.use(bodyparser())

app.use(router.routes())

let PORT = process.env.PORT || 4000
let ENV = process.env.NODE_ENV || 'development'

app.context.schemas = schemas
app.context.db = db(ENV)

app.context.db.migrate.latest()
  .then(() => {
    app.listen(PORT)
    debug(`${ENV} server listening at http://localhost:${PORT}`)
  })
  .catch(console.error)
