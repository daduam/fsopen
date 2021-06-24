import React from 'react'

const Notify = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={`notify ${type}`}>
      {message}
    </div>
  )
}

export default Notify
