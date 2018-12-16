export async function signup(username, password) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  }).then(res => {
    return res.json().then(json => {
      if (!res.ok) {
        let errors = Object.values(json.errors)[0]
        let msg = Array.isArray(errors) ? errors[0] : ''
        msg = msg.slice(0, 1).toUpperCase() + msg.slice(1)
        return Promise.reject(msg)
      }
      return json.user
    })
  })
}

export async function login(username, password) {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  }).then(res => {
    return res.json().then(json => {
      if (!res.ok) {
        let errors = Object.values(json.errors)[0]
        let msg = Array.isArray(errors) ? errors[0] : ''
        msg = msg.slice(0, 1).toUpperCase() + msg.slice(1)
        return Promise.reject(msg)
      }
      return json.user
    })
  })
}

export async function logout() {
  return fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  }).then(res => res.json())
}

export async function fetchSignedInUser() {
  return fetch('/api/user', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => res.json())
    .then(res => res.user)
}
