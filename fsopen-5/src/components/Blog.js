import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, creator, deleteBlog }) => {
  const [toggleLabel, setToggleLabel] = useState('view')
  const [liked, setLiked] = useState(false)

  const handleToggleClick = () => {
    setToggleLabel(toggleLabel === 'view' ? 'hide' : 'view')
  }

  const handleLike = () => {
    likeBlog(blog.id, liked)
    setLiked(!liked)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  const blogStyle = {
    padding: '10px 2px',
    border: 'solid',
    borderWidth: '1px',
    width: '80vw',
    margin: '5px auto'
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
  likeBlog: PropTypes.func.isRequired,
  creator: PropTypes.bool,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
