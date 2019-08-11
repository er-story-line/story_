import { createStore, combineReducers } from 'redux'

/**
 * Reducers
 */
import lineReducer from 'src/reducers/line'

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    line: lineReducer,
  }),
)

/**
 * export
 */
export default store
