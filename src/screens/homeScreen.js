import React, {Component} from 'react';
import { Text,View, StyleSheet, Image } from 'react-native';
import {MKButton, MKColor} from 'react-native-material-kit';

const ColorFab = MKButton.coloredFab().build();

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {navigate}  =  this.props.navigation;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tap to explore local food choices</Text>
            <ColorFab
                backgroundColor={'#F9F9EA'}
                shadowRadius={2}
                shadowOffset={{width:0, height:2}}
                shadowOpacity={.6}
                shadowColor="black"
                style={styles.button}
                onPress={() => navigate('Choices')}
            >
              <Image style={styles.image} pointerEvents="none" source={require('../assets/dice.png')} />
            </ColorFab>
        </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7F7F'
  },
  title: {
    color: "white",
    fontSize: 24,
    paddingBottom: 70,
  },
  button: {
    height: 250,
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
}
});
