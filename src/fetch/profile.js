export async function getProfile(username) {
  return fetch(`/api/profiles/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.json().then(json => {
      if (!res.ok) {
        return Promise.reject(res)
      }
      return json.profile
    })
  })
}
