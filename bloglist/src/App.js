import React, { useEffect } from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { initAuth, logout } from './reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notify from './components/Notify'
import Users from './components/Users'
import User from './components/User'
import { allUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initAuth())
    // TODO: fix gets all users even without auth
    dispatch(allUsers())
  }, [dispatch])

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  if (auth === null) {
    return (<LoginForm />)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notify />
      <p>{auth.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='new blog'>
            <BlogForm />
          </Togglable>

          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App