'use strict';
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MKButton, MKColor} from 'react-native-material-kit';

import CardPhotoComp from './CardPhotoComp';
import DistanceComp from './DistanceComp';
import PriceLevelComp from './PriceLevelComp';
import RatingComp from '../common/RatingComp';

const { height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const ColorFab = MKButton.coloredFab().build();

export default class CardComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // <ColorFab
    //     backgroundColor={'#F9F9EA'}
    //     shadowRadius={2}
    //     shadowOffset={{width:0, height:2}}
    //     shadowOpacity={.6}
    //     shadowColor="black"
    //     style={styles.button}
    //     onPress={() => navigate('Choices')}
    // >
    //   <Image style={styles.image} pointerEvents="none" source={require('../assets/dice.png')} />
    // </ColorFab>

    // <TouchableHighlight style={styles.buttonView} onPress={() => this.props.infoCallback()}>
    //   <View>
    //     <Icon name="info" size={30} color="#FFFFFF"/>
    //   </View>
    // </TouchableHighlight>
    return (
      <View style={styles.outterView}>
        <View style={styles.card}>
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <CardPhotoComp photo={this.props.card.photos}/>
          </View>
          <View style={{flex: .5, flexDirection: 'row', paddingTop: 15}}>
            <Text style={styles.text}>{this.props.card.name}</Text>
            <View style={styles.button}>
            <ColorFab
                backgroundColor={'#FF7F7F'}
                shadowRadius={1}
                shadowOffset={{width:0, height:1}}
                shadowOpacity={.4}
                shadowColor="grey"
                style={styles.button}
                onPress={() => this.props.infoCallback()}
                >
                <View>
                  <Icon name="info" size={30} color="#FFFFFF"/>
                </View>
            </ColorFab>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.cardColumn}>
              <Text style={{textAlign: 'center'}}>Distance: </Text>
              <DistanceComp srcGPS={this.props.gps} desGPS={this.props.card.geometry.location}/>
            </View>
            <View style={styles.cardColumn}>
              <Text style={{textAlign: 'center'}}>Rating:</Text>
              <View style={styles.levelContent}>
                <RatingComp rating={this.props.card.rating}/>
              </View>
            </View>
            <View style={styles.cardColumn}>
              <Text style={{textAlign: 'center'}}>Price Level: </Text>
              <View style={styles.levelContent}>
                <PriceLevelComp priceLevel={this.props.card.price_level}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: SCREEN_HEIGHT * .02,
    marginBottom: SCREEN_HEIGHT * .20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  outterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    backgroundColor: "transparent",
    paddingRight: 10,
    paddingTop: 10,
  },
  cardColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  levelContent:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
