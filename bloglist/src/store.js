import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: authReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store