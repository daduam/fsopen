import blogService from '../services/blogs'

// TODO: try-catch guards for code that need it

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
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog)
    dispatch({
      type: NEW_BLOG,
      data: savedBlog
    })
  }
}

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(likedBlog.id, likedBlog)
    dispatch({
      type: LIKE_BLOG,
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: DELETE_BLOG,
      data: id
    })
  }
}

export default reducer