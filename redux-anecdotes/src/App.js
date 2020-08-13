import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddAnecdote from './components/AddAnecdote'
import { voteWithId } from './reducers/anecdoteReducer'


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const anecdotesByVotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(voteWithId(id))
  }

  return (
    <Fragment>
      <h2>Anecdotes</h2>
      {anecdotesByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AddAnecdote />
    </Fragment>
  )
}

export default App