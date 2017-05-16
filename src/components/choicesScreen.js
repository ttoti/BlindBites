import React, {Component} from 'react';
import {Text,View} from 'react-native';

export default class choicesScreen extends Component {
  static navigationOptions = {
    title: 'Choices',
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Choices</Text>
        <Text>{params.data}</Text>
      </View>
    );
  }
}
