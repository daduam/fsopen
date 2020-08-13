import React, { Fragment } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = () => {
  return (
    <Fragment>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </Fragment>
  )
}

export default App