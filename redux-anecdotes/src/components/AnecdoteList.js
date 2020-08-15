import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteWithId, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


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
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (id) => {
    const voted = anecdotes.find(a => a.id === id)
    dispatch(voteWithId({
      ...voted, votes: voted.votes + 1
    }))
    dispatch(setNotification(`you voted '${voted.content}'`, 4))
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