import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  render() {
    return (
      <View style={styles.card}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Image
            style={{width: 200, height: 200, borderRadius: 10}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
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
