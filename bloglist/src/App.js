import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const [notifyMessage, setNotifyMessage] = useState(null)
  const [notifyType, setNotifyType] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch ({ response }) {
      setNotifyMessage('wrong username or password')
      setNotifyType('error')
      setTimeout(() => {
        setNotifyMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  // const createBlog = async (newBlog) => {
  //   try {
  //     const savedBlog = await blogService.create(newBlog)
  //     setBlogs(blogs.concat(savedBlog))
  //     // TODO: show remove button after create
  //     // currently requires refresh
  //     setNotifyMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
  //     setNotifyType('success')
  //     setTimeout(() => {
  //       setNotifyMessage(null)
  //     }, 5000)
  //   } catch ({ response }) {
  //     console.error(response.data.error)
  //   }
  // }

  if (user === null) {
    return (<LoginForm logUser={logUser} />)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notify message={notifyMessage} type={notifyType} />
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