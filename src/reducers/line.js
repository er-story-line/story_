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
export const CREATE_LINE = 'LINE.CREATE_LINE'
export const UPDATE_INDEX = 'LINE.UPDATE_INDEX'
export const UPDATE_METADATA = 'LINE.UPDATE_METADATA'

/*
 * action creators
 */
export const actionCreators = {
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
  updateIndex: ({ resource, index }) => ({
    type: UPDATE_INDEX,
    payload: { resource, index },
  }),
  updateMetadata: ({ resource, line }) => ({
    type: UPDATE_METADATA,
    payload: { resource, line },
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
  switch (action.type) {
    case CREATE_LINE: {
      const {
        payload: {
          idxResource, mdResource, idx, line,
        },
      } = action
      return update(state, {
        lines: { $merge: { [mdResource]: { ...line } } },
        indices: { $merge: { [idxResource]: { ...idx } } },
      })
    }
    case UPDATE_INDEX: {
      const {
        payload: { resource, index },
      } = action
      return update(state, {
        indices: { $merge: { [resource]: { ...index } } },
      })
    }
    case UPDATE_METADATA: {
      const {
        payload: { resource, line },
      } = action
      return update(state, {
        lines: { $merge: { [resource]: { ...line } } },
      })
    }
    default: {
      return state
    }
  }
}

export default partialReducer
