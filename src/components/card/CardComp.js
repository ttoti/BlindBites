'use strict';
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DistanceComp from './DistanceComp';
import PriceLevelComp from './PriceLevelComp';
import RatingComp from '../common/RatingComp';
import CardPhotoComp from './CardPhotoComp';

export default class CardComp extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.card}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <CardPhotoComp photo={this.props.card.photos}/>
        </View>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.card.name}</Text>
          <Icon.Button name="info" color="#000000" backgroundColor="#B4B4B4" onPress={this.props.callbackModal}>
            Info
          </Icon.Button>
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
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    fontSize: 16,
    backgroundColor: "transparent",
    paddingRight: 10,
    paddingTop: 5,
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
