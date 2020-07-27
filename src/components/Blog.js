import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [toggleLabel, setToggleLabel] = useState('view')

  const handleToggleClick = () => {
    setToggleLabel(toggleLabel === 'view' ? 'hide' : 'view')
  }
  
  const blogStyle = {
    padding: '10px 2px',
    border: 'solid',
    borderWidth: '1px',
    width: '80vw',
    margin: '5px auto'
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={handleToggleClick}>{toggleLabel}</button>
      </div>
      {toggleLabel === 'hide' && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}&nbsp;
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'No User'}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
