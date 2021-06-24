import React from 'react'
import { useSelector } from 'react-redux'

const Notify = () => {
  const notify = useSelector(state => state.notify)

  if (notify === null) {
    return null
  }
  return (
    <div className={`notify ${notify.type}`}>
      {notify.message}
    </div>
  )
}

export default Notify
