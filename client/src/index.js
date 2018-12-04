import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'
import * as serviceWorker from './serviceWorker'
import './styles/index.module.css'

ReactDOM.render(<App />, document.getElementById('app-root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
