const SET_NOTIF = 'SET_NOTIFICATION'
const CLEAR_NOTIF = 'CLEAR_NOTIFICATION'
const initialMessage = ''

const notificaionReducer = (state = initialMessage, action) => {
  switch(action.type) {
    case SET_NOTIF:
      return action.data

    case CLEAR_NOTIF:
      return ''

    default:
      return state
  }
}

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch({
      type: SET_NOTIF,
      data: message
    })
    await setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIF
      })
    }, duration * 1000);
  }
}

export default notificaionReducer