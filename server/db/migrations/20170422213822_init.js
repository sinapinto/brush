exports.up = function (knex) {
  return knex.schema

    .createTable('users', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('email').unique().notNullable()
      table.string('username').unique().notNullable()
      table.string('image').defaultTo('')
      table.text('bio').defaultTo('')
      table.string('password').notNullable()
      table.timestamps(true, true)
    })

    .createTable('posts', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('slug').unique().notNullable()
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.string('description').notNullable()
      table.uuid('author').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts')
}
