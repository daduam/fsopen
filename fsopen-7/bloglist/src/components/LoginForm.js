import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUser } from '../reducers/authReducer'
import Notify from './Notify'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    dispatch(logUser({ username, password }))

    setUsername('')
    setPassword('')
  }

  return (
    <form>
      <h2>log in to the application</h2>
      <Notify />
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>login</button>
    </form>
  )
}

export default LoginForm