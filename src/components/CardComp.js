'use strict';
import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button} from 'react-native';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';

const turfDistance = require('@turf/distance');

export default class CardComp extends Component {
    constructor(props) {
    super(props);
  }

  renderDistanceComp = () => {
    if(this.props.card.geometry){
      var gpsObjectCard = this.props.card.geometry.location;
      var from = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [this.props.gps[0], this.props.gps[1]]
        }
      };
      var to = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [gpsObjectCard.lat, gpsObjectCard.lng]
        }
      };
      var distance = turfDistance(from, to, "miles");
      return <Text style={{textAlign: 'center'}}>{Math.round(distance * 100) / 100} miles away</Text>
    }else{
      return <Text style={{textAlign: 'center'}}>N/A</Text>;
    }
  }
  renderPriceLevelComp = () => {
    if(this.props.card.price_level){
      return (
        <StarRating
          disabled={true}
          fullStar={'dollar'}
          emptyStar={'minus'}
          iconSet={'FontAwesome'}
          maxStars={4}
          rating={this.props.card.price_level}
          starColor={'green'}
          starSize={20}
        />
      );
    }else{
      return <Text style={{textAlign: 'center'}}>N/A</Text>;
    }
  }
  renderPhoto = () => {
    if(this.props.card.photos){
      return (
        <FastImage
          style={{width : 200, height: 200, borderRadius: 10}}
          source={{
            uri: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
                    this.props.card.photos[0].photo_reference +
                    '&sensor=false&maxheight=500&maxwidth=800&key=' + Config.GOOGLE_MAPS_API_KEY,
            headers:{},
            priority: FastImage.priority.normal,
            }}
        />
      );
    }else{
      return ( <Image style={{width: 200, height: 200, borderRadius: 10}} source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/ef/50/ca/ef50ca35e6a867583bb5deb8e457c3df.jpg"}} /> );
    }
  }
  render() {
    return (
      <View style={styles.card}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          {this.renderPhoto()}
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.text}>{this.props.card.name}</Text>
          <Icon.Button name="info" color="#000000" backgroundColor="#B4B4B4" onPress={this.props.callbackModal}>
            Info
          </Icon.Button>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>Distance: </Text>
            {this.renderDistanceComp()}
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>Rating:</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              emptyStar={'star-o'}
              halfStar={'star-half'}
              fullStar={'star'}
              starColor={'#E1E100'}
              iconSet={'FontAwesome'}
              rating={this.props.card.rating}
              starSize={20}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>Price Level: </Text>
            {this.renderPriceLevelComp()}
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
    height: 40,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    backgroundColor: "transparent",
    paddingRight: 10,
    paddingTop: 5,
  }
});
