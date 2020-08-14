import React, { Fragment } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useSelector } from 'react-redux'
import Notification  from './components/Notification'


const App = () => {
  const notification = useSelector(state => state.notification)

  return (
    <Fragment>
      <h2>Anecdotes</h2>
      {notification === '' ? null : <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </Fragment>
  )
}

export default App