const SET_NOTIF = 'SET_NOTIFICATION'
const CLEAR_NOTIF = 'CLEAR_NOTIFICATION'
const initialMessage = null
let timeoutID;

const notificaionReducer = (state = initialMessage, action) => {
  switch(action.type) {
    case SET_NOTIF:
      return action.data

    case CLEAR_NOTIF:
      return null

    default:
      return state
  }
}

export const setNotification = (message, duration) => {
  clearTimeout(timeoutID)
  return async (dispatch) => {
    dispatch({
      type: SET_NOTIF,
      data: message
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: CLEAR_NOTIF })
    }, duration * 1000);
  }
}

export default notificaionReducer