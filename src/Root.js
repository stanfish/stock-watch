import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (props) => {
  return (
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(thunk)))}>
      {props.children}
    </Provider>
  );
}