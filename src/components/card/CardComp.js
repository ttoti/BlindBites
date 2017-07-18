'use strict';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CardPhotoComp from './CardPhotoComp';
import DistanceComp from './DistanceComp';
import PriceLevelComp from './PriceLevelComp';
import RatingComp from '../common/RatingComp';

const { height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;

export default class CardComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.outterView}>
        <View style={styles.card}>
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <CardPhotoComp photo={this.props.card.photos}/>
          </View>
          <View style={styles.button}>
            <Text style={styles.text}>{this.props.card.name}</Text>
            <TouchableHighlight style={styles.buttonView} onPress={() => this.props.infoCallback()}>
              <View>
                <Icon name="info" size={30} color="#FFFFFF"/>
              </View>
            </TouchableHighlight>
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
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonView: {
    backgroundColor: "#B4B4B4",
    width: 40,
    alignItems: 'center',
    borderWidth: .5,
    borderColor: "#000000",
    borderRadius: 50,
  },
  outterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
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
