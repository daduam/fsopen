import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteWithId, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes.sort((a, b) => b.votes - a.votes)
    }
    return anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => {
        dispatch(initializeAnecdotes(anecdotes))
      })
  }, [dispatch])

  const vote = (id) => {
    dispatch(voteWithId(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList