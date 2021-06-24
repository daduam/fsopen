import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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


const AnecdoteList = ({ initializeAnecdotes, ...props }) => {
  useEffect(() => {
    initializeAnecdotes()
  }, [initializeAnecdotes])

  const vote = (id) => {
    const voted = props.anecdotes.find(a => a.id === id)
    props.voteWithId({
      ...voted, votes: voted.votes + 1
    })
    props.setNotification(`you voted '${voted.content}'`, 4)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)
    }
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    })
  }
}

const mapDispatchToProps = {
  initializeAnecdotes,
  voteWithId,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)