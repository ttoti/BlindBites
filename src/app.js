import React, {Component} from 'react';
import {
  AppRegistry,
  Text,View
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer);

import { StackNavigator } from 'react-navigation';
import homeScreen from './screens/homeScreen';
import choicesScreen from './screens/choicesScreen';
import selectionScreen from './screens/selectionScreen';
import infoScreen from './screens/infoScreen';
import aboutScreen from './screens/aboutScreen';

const BlindBites = StackNavigator({
  Home: { screen: homeScreen },
  Choices: { screen: choicesScreen },
  Selection: { screen: selectionScreen },
  Information: { screen: infoScreen },
  About: {screen: aboutScreen}
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BlindBites />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BlindBites', () => App);
