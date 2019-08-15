import { createStore, combineReducers, applyMiddleware } from 'redux'

/**
 * Reducers
 */
import lineReducer from 'src/reducers/lines'
import accountReducer from 'src/reducers/accounts'
import postsReducer from 'src/reducers/posts'

// Logger with default options
import logger from 'redux-logger' // eslint-disable-line import/no-extraneous-dependencies

let middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares = [logger]
}

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    lines: lineReducer,
    accounts: accountReducer,
    posts: postsReducer,
  }),
  applyMiddleware(...middlewares),
)

/**
 * export
 */
export default store
