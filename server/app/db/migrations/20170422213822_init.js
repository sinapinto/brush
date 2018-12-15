exports.up = function (knex) {
  return knex.schema

    .createTable('users', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('username').unique().notNullable()
      table.string('avatar').defaultTo('')
      table.text('bio').defaultTo('')
      table.string('password').notNullable()
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })

    .createTable('posts', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('slug').unique().notNullable()
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.uuid('author').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.integer('favoritesCount').notNullable().defaultTo(0)
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })

    .createTable('favorites', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.uuid('user').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.uuid('post').notNullable().references('posts.id')
        .onDelete('CASCADE')
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })

    .createTable('followers', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.uuid('user').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.uuid('follower').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.unique(['user', 'follower'])
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })

}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts')
    .dropTableIfExists('followers')
}
