import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, creator }) => {
  const dispatch = useDispatch()

  const [toggleLabel, setToggleLabel] = useState('view')
  const [liked, setLiked] = useState(false)

  const handleToggleClick = () => {
    setToggleLabel(toggleLabel === 'view' ? 'hide' : 'view')
  }

  const handleLike = () => {
    dispatch(likeBlog({
      ...blog,
      likes: liked ? blog.likes - 1 : blog.likes + 1
    }))
    setLiked(!liked)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const blogStyle = {
    padding: '10px 2px',
    border: 'solid',
    borderWidth: '1px',
    width: '80vw',
    margin: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="defaultDisplay">
        {blog.title} - {blog.author}
        <button onClick={handleToggleClick}>{toggleLabel}</button>
      </div>
      {toggleLabel === 'hide' && (
        <div className="defaultHidden">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}&nbsp;
            <button onClick={handleLike} className="likeBtn">{liked ? 'unlike' : 'like'}</button>
          </div>
          <div>{blog.user ? blog.user.name : 'No User'}</div>
          {creator && <button onClick={handleDelete} className="deleteBtn">remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  creator: PropTypes.bool
}

export default Blog
