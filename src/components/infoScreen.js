import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, ScrollView} from 'react-native';

export default class infoScreen extends Component {
    constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Information',
  };
  render() {
    const { params } = this.props.navigation.state;

    console.log(params.card);
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Wot</Text>
      </ScrollView>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7F7F',
    flexDirection: 'column',
  },
  scrollView: {
    flex: .8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 20,
  }
});
