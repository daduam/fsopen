import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { initAuth, logout } from './reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notify from './components/Notify'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initAuth())
  }, [dispatch])

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  if (user === null) {
    return (<LoginForm />)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notify />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>

      <BlogList />
    </div>
  )
}

export default App