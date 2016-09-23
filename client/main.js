import ReactDom from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

injectTapEventPlugin();

ReactDom.render(
  <App />,
  document.getElementById('app')
);
