import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/authReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const padding = { padding: '2px 5px' }

  return (
    <div>
      <div>
        <Link to="/blogs" style={padding}>blogs</Link>
        <Link to="/users" style={padding}>users</Link>
        <span style={padding}>{auth.name} logged in </span>
        <button style={padding} onClick={handleLogout}>logout</button>
      </div>

      <h2>blogs</h2>
    </div>
  )
}

export default Menu