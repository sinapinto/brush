exports.up = function (knex) {
  return knex.schema

    .createTable('users', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('username').unique().notNullable()
      table.string('avatar').defaultTo('')
      table.text('bio').defaultTo('')
      table.string('password').notNullable()
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
    })

    .createTable('posts', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('slug').unique().notNullable()
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.string('description').notNullable()
      table.uuid('author').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts')
}
