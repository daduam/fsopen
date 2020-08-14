const SET_NOTIF = 'SET_NOTIF'
const REMOVE_NOTIF = 'REMOVE_NOTIF'
const initialMessage = ''

const notificaionReducer = (state = initialMessage, action) => {
  switch(action.type) {
    case SET_NOTIF:
      return action.message

    case REMOVE_NOTIF:
      return ''

    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: SET_NOTIF,
    message
  }
}

export const removeNotification = () => {
  return  {
    type: REMOVE_NOTIF
  }
}

export default notificaionReducer