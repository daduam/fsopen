import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(anecdote)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)