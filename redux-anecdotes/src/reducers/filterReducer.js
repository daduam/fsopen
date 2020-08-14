const FILTER = 'FILTER'
const initialValue = ''


const filterReducer = (state = initialValue, action) => {
  switch(action.type) {
    case FILTER:
      return action.value

    default:
      return state
  }
}

export const filterAnecdotes = (value) => {
  return {
    type: FILTER,
    value
  }
}

export default filterReducer