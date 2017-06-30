import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Dimensions, ScrollView} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
export default class infoScreen extends Component {
    constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Information',
  };
  render() {
    const { params } = this.props.navigation.state;

    console.log(params.card);
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            mapType="hybrid"
            scrollEnabled={false}
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
          >
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
  scrollView: {
    flex: .8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 20,
  },
  mapView: {
    alignItems: 'center'
  },
  map: {
    width: (SCREEN_WIDTH * .8) - 5,
    height: 250,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
