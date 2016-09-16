import ReactDom from 'react-dom';
import React from 'react';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers';

const store = createStore(allReducers);

ReactDom.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('app'));
