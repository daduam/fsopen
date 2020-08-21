import loginService from '../services/login'
import blogService from '../services/blogs'

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
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch({ type: INIT_AUTH, data: user })
    }
    else {
      dispatch({ type: INIT_AUTH, data: null })
    }
  }
}

export const logUser = (userCredentials) => {
  return async (dispatch) => {
    const user = await loginService.login(userCredentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: LOGIN,
      data: user
    })
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