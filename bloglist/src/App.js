import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notify from './components/Notify'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  // sort blogs by decreasing number of likes
  const blogsByLikes = blogs.sort((blogA, blogB) => {
    return blogB.likes - blogA.likes
  })

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
      }, 3000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      // TODO: show remove button after create
      // currently requires refresh
      setNotifyMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
      setNotifyType('success')
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    } catch ({ response }) {
      console.error(response.data.error)
    }
  }

  const likeBlog = async (id, liked) => {
    try {
      const newBlog = blogs.find(blog => blog.id === id)

      const updatedBlog = await blogService.update(id, {
        ...newBlog,
        likes: liked ? newBlog.likes - 1 : newBlog.likes + 1
      })

      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch(error) {
      console.error(error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch(error) {
      console.error(error)
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
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <div style={{ marginTop: '1em' }}>
        {blogsByLikes.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            creator={
              blog.user
                ? blog.user.username === user.username
                : false
            }
            deleteBlog={deleteBlog}
          />
        )}
      </div>

    </div>
  )
}

export default App