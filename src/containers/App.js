import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import store from '../store/configureStore';

import FormContainer from './FormContainer';
import ResultContainer from './ResultContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <FormContainer />
          <ResultContainer />
          {__DEV__ && <DevTools />}
        </div>
      </Provider>
    );
  }
}
