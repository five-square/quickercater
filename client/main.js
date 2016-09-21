import ReactDom from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import allReducers from './reducers';

const store = createStore(allReducers);

injectTapEventPlugin();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
