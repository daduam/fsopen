import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

// TODO: api needs to implement fetching single resources by id

const Blog = () => {
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const blog = await blogService.getById(id)
      setBlog(blog)
    })()
  }, [id])

  const handleLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(likedBlog))
  }

  const addComment = async (e) => {
    e.preventDefault()
    try {
      const updatedBlog = await blogService.addComment(blog.id, { comment })
      setComment('')
      setBlog(updatedBlog)
    } catch(error) {
      console.error(error)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes
          <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>

      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input value={comment} onChange={({ target }) => setComment(target.value)} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {
            blog.comments.map((comment, idx) => {
              return <li key={idx}>{comment}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog
