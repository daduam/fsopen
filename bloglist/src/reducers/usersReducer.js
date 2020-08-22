import usersService from '../services/users'

const ALL_USERS = 'ALL_USERS'

const reducer = (state = [], action) => {
  switch (action.type) {
  case ALL_USERS:
    return action.data

  default:
    return state
  }
}

export const allUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: ALL_USERS,
        data: users
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default reducer