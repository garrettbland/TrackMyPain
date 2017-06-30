import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import userReducers from './app/reducers';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Main from './app/main.js';

let store = createStore(combineReducers({userReducers}));

class TrackMyPain extends Component {
  render(){
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('TrackMyPain', () => TrackMyPain);
