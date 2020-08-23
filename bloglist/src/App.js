import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
} from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

import { initAuth } from './reducers/authReducer'
import { allUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initAuth())
    // TODO: fix gets all users even without auth
    dispatch(allUsers())
  }, [dispatch])

  if (auth === null) {
    return (<LoginForm />)
  }

  return (
    <div>
      <Menu />

      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
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