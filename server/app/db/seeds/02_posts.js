let faker = require('faker')
let uuid = require('uuid')
let slug = require('slug')
let { subMonths } = require('date-fns')
let { getUsers } = require('./01_users')

function getPosts(users) {
  return users.map((user) => {
    return Array.from({ length: 10 }, () => {
      let title = faker.lorem.sentence()
      let date = faker.date.between(subMonths(new Date(), 18), new Date())
        .toISOString()

      return {
        id: uuid(),
        author: user.id,
        title,
        slug: slug(title, { lower: true }),
        body: faker.lorem.sentences(10),
        createdAt: date,
        updatedAt: date
      }
    })
  })
}

exports.getPosts = getPosts

exports.seed = async function(knex) {
  let users = getUsers()

  if (process.env.NODE_ENV === 'production') {
    await knex('posts').whereIn('author', users.map(u => u.id)).del()
  } else {
    await knex('posts').del()
  }

  return Promise.all(getPosts(users).map(a => knex('posts').insert(a)))
}
