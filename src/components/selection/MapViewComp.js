'use strict';
import React, {Component} from 'react';
import {Dimensions, Linking, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView from 'react-native-maps';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class MapViewComp extends Component {
  constructor(props) {
    super(props);
  }

  openGPS = (lat, lng) =>{
    var scheme = Platform.OS === 'ios' ? 'http://maps.apple.com/?daddr=' : 'geo:'
    var url = scheme + lat + ',' + lng;
    console.log(url);
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={styles.mapView}>
          <TouchableOpacity onPress={() => this.openGPS(this.props.gps.lat, this.props.gps.lng)}>
          <MapView
            style={styles.map}
            mapType="hybrid"
            scrollEnabled={false}
            initialRegion={{
            latitude: this.props.gps.lat,
            longitude: this.props.gps.lng,
            latitudeDelta: 0.0082,
            longitudeDelta: 0.0041,
          }}>
            <MapView.Marker
              coordinate={{
                latitude: this.props.gps.lat,
                longitude: this.props.gps.lng
              }}/>
          </MapView>
          </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    width: (SCREEN_WIDTH * .80),
    height: 250,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  mapView: {
    alignItems: 'center',
    paddingTop: 20,
  },
})
