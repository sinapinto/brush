let bcrypt = require('bcrypt')
let faker = require('faker')

let users = [
  {
    name: 'admin',
    id: '345ae4d0-f2c3-4342-91a2-5b45cb8db57f'
  },
  {
    name: 'demo',
    id: '16c1ef84-df72-4be1-ad46-1168ee53cd60'
  },
]

function getUsers() {
  return users.map(u => {
    return {
      id: u.id,
      username: u.name,
      password: bcrypt.hashSync('X12345678', 10),
      bio: faker.lorem.sentences(),
      avatar: faker.image.avatar(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  })
}

exports.getUsers = getUsers

exports.seed = async function(knex) {
  await knex('users').del()
  return knex('users').insert(getUsers())
}
