import { HIDE_ALERT, SHOW_ALERT } from '../types';

const handlers = {
  [SHOW_ALERT]: action => action.payload,
  [HIDE_ALERT]: () => null,
  DEFAULT: (state, action) => {
    console.error('action: ', action);
    console.error('state: ', state);
    throw new Error('alertReducer error'); 
  }
}

const alertReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action);
}

export default alertReducer;
