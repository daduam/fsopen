import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const VOTE = 'VOTE'
const NEW_ANECDOTE = 'NEW_ANECDOTE'
const INIT_ANECDOTES = 'INIT_ANECDOTES'


const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      const updatedAnecdote = action.data
      return state.map(anecdote => 
        anecdote.id !== updatedAnecdote.id
        ? anecdote
        : updatedAnecdote
      )
    
    case NEW_ANECDOTE:
      return state.concat(action.data)

    case INIT_ANECDOTES:
      return action.data

    default:
      return state
  }
}

export const voteWithId = (voted) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(voted.id, voted)
    dispatch({
      type: VOTE,
      data: updatedAnecdote
    })
  } 
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.addNew({
      content: anecdote,
      votes: 0
    })
    dispatch({
      type: NEW_ANECDOTE,
      data: savedAnecdote
    })
    dispatch(setNotification(`new anecdote ${savedAnecdote.content}`, 4))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes
    })
  }
} 

export default reducer