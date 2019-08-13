import update from 'immutability-helper'

/**
 * initial state
 */
const initialState = {
  accounts: {},
  curAccountIndex: '',
}

/*
 * action types
 */
export const ADD_ACCOUNT = 'ACCOUNT.ADD_ACCOUNT'
export const UPDATE_CURRENT_ACCOUNT_INDEX = 'ACCOUNT.UPDATE_CURRENT_ACCOUNT_INDEX'
export const UPDATE_CURRENT_LINE = 'ACCOUNT.UPDATE_CURRENT_LINE'

/*
 * action creators
 */
export const actionCreators = {
  addAccount: ({
    resource,
    account: {
      lines: {
        current: { uri },
      },
    },
  }) => ({
    type: ADD_ACCOUNT,
    payload: { resource, uri },
  }),
  updateCurAccountIndex: ({ resource }) => ({
    type: UPDATE_CURRENT_ACCOUNT_INDEX,
    payload: { resource },
  }),
  updateCurrentLine: ({ uri }) => ({
    type: UPDATE_CURRENT_LINE,
    payload: { uri },
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
    case ADD_ACCOUNT: {
      const {
        payload: { resource, uri },
      } = action
      return update(state, {
        accounts: { $merge: { [resource]: { lines: { current: { uri } } } } },
      })
    }
    case UPDATE_CURRENT_ACCOUNT_INDEX: {
      const {
        payload: { resource },
      } = action
      return update(state, {
        curAccountIndex: { $set: resource },
      })
    }
    case UPDATE_CURRENT_LINE: {
      const {
        payload: { uri },
      } = action
      return update(state, {
        accounts: {
          [state.curAccountIndex]: {
            lines: { current: { uri: { $set: uri } } },
          },
        },
      })
    }
    default: {
      return state
    }
  }
}

export default partialReducer
