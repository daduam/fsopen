import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteWithId } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


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
  const anecdotesByVotes = useSelector(state => {
    return state.anecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteWithId(id))
    const votedAnecdote = anecdotesByVotes.find(a => a.id === id)
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <div>
      {anecdotesByVotes.map(anecdote =>
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