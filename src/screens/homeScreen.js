import React, {Component} from 'react';
import { Text,View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {MKButton, MKColor} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const ColorFab = MKButton.coloredFab().build();

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {navigate}  =  this.props.navigation;
    return (
        <View style={styles.outterView}>
          <View style={styles.container}>
              <Text style={styles.title}>Tap to explore</Text>
              <ColorFab
                  backgroundColor={'#FFFFFF'}
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
          <View style={styles.bottomRow}>
            <View style={{flex: .5, paddingLeft: 10}}>
              <TouchableOpacity onPress={() => console.log('list')}>
                <Icon name="list" size={25} color="#FFFFFF"/>
              </TouchableOpacity>
            </View>
            <View style={{flex: .5, alignItems: 'flex-end', paddingRight: 10}}>
              <TouchableOpacity onPress={() => console.log('about')}>
                <Icon name="question-circle" size={30} color="#FFFFFF"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}
var styles = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    flex: .055,
  },
  outterView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FF7F7F',
  },
  container: {
    flex: .8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7F7F'
  },
  title: {
    color: "white",
    fontSize: 40,
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
