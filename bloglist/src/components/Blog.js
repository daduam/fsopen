import React from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// TODO: api needs to implement fetching single resources by id

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blog = useSelector(state => {
    return state.blogs.find(b => b.id === id)
  })

  const handleLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(likedBlog))
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
        <ul>
          {
            blog.comments &&
            blog.comments.map(comment => {
              return <li key="1">{comment}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog
