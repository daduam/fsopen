const VOTE = 'VOTE'
const NEW_ANECDOTE = 'NEW_ANECDOTE'
const INIT_ANECDOTES = 'INIT_ANECDOTES'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    
    case NEW_ANECDOTE:
      return state.concat(action.data)

    case INIT_ANECDOTES:
      return action.data

    default:
      return state
  }
}

export const voteWithId = (id) => {
  return {
    type: VOTE,
    data: { id }
  }
}

export const addAnecdote = (newAnecdote) => {
  return {
    type: NEW_ANECDOTE,
    data: newAnecdote
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: INIT_ANECDOTES,
    data: anecdotes
  }
} 

export default reducer