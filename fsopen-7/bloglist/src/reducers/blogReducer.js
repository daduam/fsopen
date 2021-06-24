import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const INIT_BLOGS = 'INIT_BLOGS'
const NEW_BLOG = 'NEW_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'

const reducer = (state = [], action) => {
  switch (action.type) {
  case INIT_BLOGS:
    return action.data

  case NEW_BLOG:
    return state.concat(action.data)

  case LIKE_BLOG:
    return state.map(blog =>
      blog.id !== action.data.id
        ? blog
        : action.data
    )

  case DELETE_BLOG:
    return state.filter(blog => blog.id !== action.data)

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: INIT_BLOGS,
        data: blogs
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      dispatch({ type: NEW_BLOG, data: savedBlog })
      dispatch(setNotification({
        message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        type: 'success',
        durationSecs: 5
      }))
    } catch (error) {
      console.error(error)
    }
  }
}

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(likedBlog.id, likedBlog)
      dispatch({
        type: LIKE_BLOG,
        data: updatedBlog
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: DELETE_BLOG,
        data: id
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default reducer