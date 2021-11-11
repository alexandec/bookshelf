import React from 'react'
import ReactDOM from 'react-dom'

import {Logo} from './components/logo'

function App() {
  const handleLogin = () => alert('Login clicked')
  const handleRegister = () => alert('Register clicked')

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
