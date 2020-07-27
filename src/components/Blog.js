import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [toggleLabel, setToggleLabel] = useState('view')

  const toggleDetails = () => {
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
        <button onClick={toggleDetails}>{toggleLabel}</button>
      </div>
      {toggleLabel === 'hide' && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'No User'}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
