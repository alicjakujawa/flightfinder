import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import store from '../store/configureStore';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {__DEV__ && <DevTools />}
        </div>
      </Provider>
    );
  }
}
