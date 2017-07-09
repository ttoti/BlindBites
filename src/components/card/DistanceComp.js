'use strict';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
const turfDistance = require('@turf/distance');

export default class DistanceComp extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    var gpsObjectCard = this.props.desGPS;
    var from = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [this.props.srcGPS[0], this.props.srcGPS[1]]
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
    const distanceView = <Text style={{textAlign: 'center', paddingTop: 2}}>{Math.round(distance * 100) / 100} miles</Text>
    return (
      <View>
        {distanceView}
      </View>
    );
  }
}
