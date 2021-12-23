import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './store/reducers/rootReducers';
import thunk from 'redux-thunk';
import './index.css';

const composeEnhancers =
  typeof window === 'object' && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

const store = createStore(
  rootReducers, 
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);
