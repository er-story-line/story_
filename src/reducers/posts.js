import update from 'immutability-helper'

/**
 * initial state
 */
const initialState = {
  posts: {},
  root: 'https://story_.com/posts/',
}

/*
 * action types
 */
export const UPDATE_POSTS = 'POSTS.UPDATE_POSTS'
export const ADD_POST = 'POSTS.ADD_POST'

/*
 * action creators
 */
export const actionCreators = {
  updatePosts: ({ resource, post }) => ({
    type: UPDATE_POSTS,
    payload: { resource, post },
  }),
  addPost: ({ resource, post }) => ({
    type: ADD_POST,
    payload: { resource, post },
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
    case UPDATE_POSTS: {
      const {
        payload: { resource, post },
      } = action
      return update(state, {
        posts: { $set: { [resource]: { ...post } } },
      })
    }
    case ADD_POST: {
      const {
        payload: { resource, post },
      } = action
      return update(state, {
        posts: { $merge: { [resource]: { ...post } } },
      })
    }
    default: {
      return state
    }
  }
}

export default partialReducer
