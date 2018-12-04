import React, { useState } from 'react'
import Button from '../../components/Button'
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
      <Button onClick={() => get('/api/')}>fetch</Button>
      <pre>{JSON.stringify(res, null, 4)}</pre>
    </div>
  )
}
