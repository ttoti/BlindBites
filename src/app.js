import React, {Component} from 'react';
import {
  AppRegistry,
  Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import mainScreen from './components/mainScreen';
import choicesScreen from './components/choicesScreen';
import selectionScreen from './components/selectionScreen';
import infoScreen from './components/infoScreen';

const BlindBites = StackNavigator({
  Home: { screen: mainScreen },
  Choices: { screen: choicesScreen },
  Selection: {screen: selectionScreen},
  Information: {screen: infoScreen}
});

AppRegistry.registerComponent('BlindBites', () => BlindBites);
