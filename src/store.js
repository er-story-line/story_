import { createStore, combineReducers, applyMiddleware } from 'redux'

/**
 * Reducers
 */
import lineReducer from 'src/reducers/line'
import accountReducer from 'src/reducers/account'
import postsReducer from 'src/reducers/posts'

// Logger with default options
import logger from 'redux-logger'

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    line: lineReducer,
    account: accountReducer,
    posts: postsReducer,
  }),
  applyMiddleware(process.env.NODE_ENV === 'development' && logger),
)

/**
 * export
 */
export default store
