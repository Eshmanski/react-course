import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';

const handlers = {
  [SEARCH_USERS]: (state, { payload }) => ({ ...state, users: payload, loading: false }),
  [GET_REPOS]: (state, { payload }) => ({ ...state, repos: payload, loading: false }),
  [GET_USER]: (state, { payload}) => ({ ...state, user: payload, loading: false }),
  [SET_LOADING]: state => ({ ...state, loading: true }),
  [CLEAR_USERS]: state => ({ ...state, users: [] }),
  DEFAULT: (state, action) => {
    console.error('action: ', action);
    console.error('state: ', state);
    throw new Error('githubReducer error'); 
  }
}

const githubReducer= (state, action) => {
  const handler = handlers[action.type] || action.DEFAULT;

  return handler(state, action);
}

export default githubReducer;
