import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteWithId } from '../reducers/anecdoteReducer'


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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const anecdotesByVotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(voteWithId(id))
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