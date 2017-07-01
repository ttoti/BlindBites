import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Dimensions, ScrollView} from 'react-native';
import Config from 'react-native-config'
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
export default class infoScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      resDetails : null,
    }
  }

  static navigationOptions = {
    title: 'Information',
  };
  componentWillMount(){
    const { params } = this.props.navigation.state;
    console.log(params.card);
      fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
             params.card.place_id + '&key=' + Config.GOOGLE_MAPS_API_KEY, {
      method:'GET',
      headers: {
        'Accept': 'application/json'
      }})
      .then((response) => response.json())
      .then((responseJson) =>{
        this.setState({resDetails : responseJson.result});
        console.log(this.state.resDetails);
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  renderReviews = () => {

  }

  renderPhotos = () => {

  }
  render() {
    const { params } = this.props.navigation.state;

    console.log(params.card);
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {this.renderPhotos()}
        {this.renderReviews()}
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
          }}
          >
            <MapView.Marker
              coordinate={{
                latitude: params.card.geometry.location.lat,
                longitude: params.card.geometry.location.lng
              }}

            />
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
    flex: .9,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 20,
  },
  mapView: {
    alignItems: 'center'
  },
  map: {
    width: (SCREEN_WIDTH * .85),
    height: 250,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
