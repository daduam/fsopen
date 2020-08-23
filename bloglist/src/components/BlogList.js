import React, { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state =>
    state.blogs.sort((blogA, blogB) => {
      return blogB.likes - blogA.likes
    })
  )

  useEffect(() => {
    (async () => {
      dispatch(initializeBlogs())
    })()
  }, [dispatch])

  const blogStyle = {
    padding: '10px 2px',
    border: 'solid',
    borderWidth: '1px',
    width: '80vw',
    margin: 5
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList