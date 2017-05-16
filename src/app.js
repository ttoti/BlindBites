import React, {Component} from 'react';
import {
  AppRegistry,
  Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import mainScreen from './components/mainScreen';
import choicesScreen from './components/choicesScreen';

const BlindBites = StackNavigator({
  Home: { screen: mainScreen },
  Choices: { screen: choicesScreen },
});

AppRegistry.registerComponent('BlindBites', () => BlindBites);
