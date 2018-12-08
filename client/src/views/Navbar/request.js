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
        }
      }),
    })
      .then((res) => {
        return res.json()
          .then((json) => {
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
