import update from 'immutability-helper'

/**
 * initial state
 */
const initialState = {
  open: false,
  content: null,
}

/*
 * action types
 */
export const OPEN_MODAL = 'MODAL.OPEN'
export const CLOSE_MODAL = 'MODAL.CLOSE'

/*
 * action creators
 */
export const actionCreators = {
  openModal: content => ({
    type: OPEN_MODAL,
    payload: { content },
  }),
  closeModal: () => ({
    type: CLOSE_MODAL,
    payload: null,
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
    case OPEN_MODAL: {
      const {
        payload: { content },
      } = action
      return update(state, { open: { $set: true }, content: { $set: content } })
    }
    case CLOSE_MODAL: {
      return update(state, { open: { $set: false }, content: { $set: null } })
    }
    default: {
      return state
    }
  }
}

export default partialReducer
