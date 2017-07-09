import React, {Component} from 'react';
import {
  AppRegistry,
  Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import homeScreen from './screens/homeScreen';
import choicesScreen from './screens/choicesScreen';
import selectionScreen from './screens/selectionScreen';
import infoScreen from './screens/infoScreen';

const BlindBites = StackNavigator({
  Home: { screen: homeScreen },
  Choices: { screen: choicesScreen },
  Selection: {screen: selectionScreen},
  Information: {screen: infoScreen}
});

AppRegistry.registerComponent('BlindBites', () => BlindBites);
