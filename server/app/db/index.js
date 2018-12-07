let knex = require('knex')

module.exports = (env) => knex(require('./knexfile')[env])
