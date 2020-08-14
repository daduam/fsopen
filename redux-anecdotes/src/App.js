import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification  from './components/Notification'
import Filter from './components/Filter'


const App = () => {
  const notification = useSelector(state => state.notification)

  return (
    <Fragment>
      <h2>Anecdotes</h2>
      {notification === '' ? null : <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </Fragment>
  )
}

export default App