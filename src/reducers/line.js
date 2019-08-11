import update from 'immutability-helper'

/**
 * initial state
 */
const initialState = {
  lines: {},
  indices: {},
  root: 'https://story_.com/line/',
}

/*
 * action types
 */
export const UPDATE_CURRENT_LINE = 'LINE.UPDATE_CURRENT_LINE'
export const CREATE_LINE = 'LINE.CREATE_LINE'

/*
 * action creators
 */
export const actionCreators = {
  updateCurrentLine: line => ({
    type: UPDATE_CURRENT_LINE,
    payload: line,
  }),
  createNewLine: ({
    idxResource, mdResource, idx, line,
  }) => ({
    type: CREATE_LINE,
    payload: {
      idxResource,
      mdResource,
      idx,
      line,
    },
  }),
}

/**
 * reducer
 *
 * @param  {object} state   state
 * @param  {object} action  action
 * @return {object}         reducer
 */
export const partialReducer = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case CREATE_LINE:
      const {
        payload: {
          idxResource, mdResource, idx, line,
        },
      } = action
      return update(state, {
        lines: { $merge: { [mdResource]: { ...line } } },
        indices: { $merge: { [idxResource]: { ...idx } } },
      })
    default:
      return state
  }
}

export default partialReducer
