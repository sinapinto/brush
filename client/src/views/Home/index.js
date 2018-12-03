import React, { useState } from 'react'
import styles from './index.module.css'

export default function Home() {
  let [res, setRes] = useState()

  let get = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(json => setRes(json))
      .catch(e => setRes(e))
  }

  return (
    <div className={styles.home}>
      <button onClick={() => get('/api/')}>fetch</button>
      <pre>{JSON.stringify(res, null, 4)}</pre>
    </div>
  )
}
