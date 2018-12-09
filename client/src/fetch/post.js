export async function createPost(title, body) {
  return fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: {
          title,
          body,
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
            return json.profile
          })
      })
}
