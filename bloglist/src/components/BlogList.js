import React, { useEffect } from 'react'
import Blog from './Blog'
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

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

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          creator={true}
        />
      )}
    </div>
  )
}

export default BlogList