import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  let { id } = useParams()
  const user = useSelector(state => {
    return state.users.find(u => u.id === id)
  })

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <div>
        {
          <ul>
            {
              user.blogs.map(blog => {
                return <li key={blog.id}>{blog.title}</li>
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default User