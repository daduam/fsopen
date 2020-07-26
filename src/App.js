import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notify from './components/Notify'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notifyMessage, setNotifyMessage] = useState(null)
  const [notifyType, setNotifyType] = useState(null)

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch ({ response }) {
      setNotifyMessage('wrong username or password')
      setNotifyType('error')
      setTimeout(() => {
        setNotifyMessage(null)
      }, 3000);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNotifyMessage(`a new blog ${title} by ${author} added`)
      setNotifyType('success')
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000);
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch ({ response }) {
      console.error(response.data.error)
    }
  }

  if (user === null) {
    return (
      <form>
        <h2>log in to the application</h2>
        <Notify message={notifyMessage} type={notifyType} />
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

  return (
    <div>
      <h2>blogs</h2>
      <Notify message={notifyMessage} type={notifyType} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='new blog'>
        <form>
          <h2>create new</h2>
          <div>
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <label htmlFor="author">author</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">url</label>
            <input
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit" onClick={handleCreateBlog}>create</button>
        </form>
      </Togglable>
      
      <div style={{ marginTop: '1em' }}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

    </div>
  )
}

export default App