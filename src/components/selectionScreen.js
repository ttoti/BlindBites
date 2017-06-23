import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';


export default class selectionScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  static navigationOptions = {
    title: 'Selection',
  };
  render() {

    const { navigate } = this.props.navigation;
    return (
     <View style={styles.container}>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7F7F'
  },
});
