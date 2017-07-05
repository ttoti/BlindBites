'use strict';
import React, {Component} from 'react';
import {Dimensions, Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import MapView from 'react-native-maps';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class infoScreen extends Component {
    constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Selection',
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            mapType="hybrid"
            scrollEnabled={false}
            initialRegion={{
            latitude: params.card.geometry.location.lat,
            longitude: params.card.geometry.location.lng,
            latitudeDelta: 0.0082,
            longitudeDelta: 0.0041,
          }}>
            <MapView.Marker
              coordinate={{
                latitude: params.card.geometry.location.lat,
                longitude: params.card.geometry.location.lng
              }}/>
          </MapView>
        </View>
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
  map: {
    width: (SCREEN_WIDTH * .85),
    height: 250,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  mapView: {
    alignItems: 'center'
  },
  scrollView: {
    flex: .9,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 20,
  }
});
