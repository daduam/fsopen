import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const INIT_AUTH = 'INIT_AUTH'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const reducer = (state = null, action) => {
  switch (action.type) {
  case INIT_AUTH:
    return action.data

  case LOGIN:
    return action.data

  case LOGOUT:
    return null

  default:
    return state
  }
}

export const initAuth = () => {
  return (dispatch) => {
    try {
      const loggedUser = window.localStorage.getItem('loggedUser')
      if (loggedUser) {
        const user = JSON.parse(loggedUser)
        blogService.setToken(user.token)
        dispatch({ type: INIT_AUTH, data: user })
      }
      else {
        dispatch({ type: INIT_AUTH, data: null })
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const logUser = (userCredentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: LOGIN,
        data: user
      })
    } catch ({ response }) {
      dispatch(setNotification({
        message: 'wrong username or password',
        type: 'error',
        durationSecs: 3
      }))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch({ type: LOGOUT })
  }
}

export default reducer