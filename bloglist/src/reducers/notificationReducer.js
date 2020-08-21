const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'
let timeoutID

const reducer = (state = null, action) => {
  switch (action.type) {
  case SET_NOTIFICATION:
    return action.data

  case CLEAR_NOTIFICATION:
    return null

  default:
    return state
  }
}

export const setNotification = ({ message, type, durationSecs }) => {
  clearTimeout(timeoutID)
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      data: { message, type }
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: CLEAR_NOTIFICATION })
    }, durationSecs * 1000)
  }
}

export default reducer