import React, {Component} from 'react';
import {
  AppRegistry,
  Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import mainScreen from './screens/mainScreen';
import choicesScreen from './screens/choicesScreen';
import selectionScreen from './screens/selectionScreen';
import infoScreen from './screens/infoScreen';

const BlindBites = StackNavigator({
  Home: { screen: mainScreen },
  Choices: { screen: choicesScreen },
  Selection: {screen: selectionScreen},
  Information: {screen: infoScreen}
});

AppRegistry.registerComponent('BlindBites', () => BlindBites);
