const faker = require('faker')
const uuid = require('uuid')
const slug = require('slug')
const { subMonths } = require('date-fns')
const { getUsers } = require('./01_users')

function getPosts (users) {
  return users.map((user) => {
    return Array.from({ length: 105 }, () => {
      const title = faker.lorem.sentence()
      const date = faker.date.between(subMonths(new Date(), 18), new Date())
        .toISOString()

      return {
        id: uuid(),
        author: user.id,
        title,
        slug: slug(title, { lower: true }),
        body: faker.lorem.sentences(10),
        description: faker.lorem.sentences(2),
        created_at: date,
        updated_at: date
      }
    })
  })
}

exports.getPosts = getPosts

exports.seed = async function (knex) {
  const users = getUsers()

  if (process.env.NODE_ENV === 'production') {
    await knex('posts').whereIn('author', users.map(u => u.id)).del()
  } else {
    await knex('posts').del()
  }

  return Promise.all(getPosts(users).map(a => knex('posts').insert(a)))
}
