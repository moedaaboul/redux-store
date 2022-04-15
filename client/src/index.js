import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
// this is the app (i.e. react-redux) that connects redux store (aka redux) with our application
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    {/* similar to context api, we need to wrap the app using the Provider, but in this case takes in a store prop */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
