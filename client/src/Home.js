import React, { useState } from 'react'

export default function Home() {
  let [res, setRes] = useState()

  let get = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(json => setRes(json))
  }

  return (
    <div>
      <button onClick={() => get('/api/')}>fetch</button>
      <pre>{JSON.stringify(res, null, 4)}</pre>
    </div>
  )
}
