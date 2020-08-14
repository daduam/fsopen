import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const savedAnecdote = await anecdoteService.addNew({
      content: anecdote,
      votes: 0
    })
    dispatch(addAnecdote(savedAnecdote))
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

export default AnecdoteForm