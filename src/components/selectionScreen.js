'use strict';
import React, {Component} from 'react';
import {Button ,Dimensions, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Communications from 'react-native-communications';
import Config from 'react-native-config';
import MapView from 'react-native-maps';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class infoScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      resDetails: null,
    }
  }

  static navigationOptions = {
    title: 'Selection',
  };

  componentWillMount(){
    const { params } = this.props.navigation.state;
    fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
           params.card.place_id + '&key=' + Config.GOOGLE_MAPS_API_KEY, {
           method:'GET',
           headers: {
             'Accept': 'application/json'
           }})
           .then((response) => response.json())
           .then((responseJson) =>{
             this.setState({resDetails : responseJson.result});
           })
           .catch((error) =>{
             console.error(error);
           }
      );
  }
  openGPS = (lat, lng) =>{
    var scheme = Platform.OS === 'ios' ? 'http://maps.apple.com/?daddr=' : 'geo:'
    var url = scheme + lat + ',' + lng;
    console.log(url);
    Linking.openURL(url);
  }
  renderDetails = () => {
    const { params } = this.props.navigation.state;
    if(this.state.resDetails != null){
      var details = this.state.resDetails;
      return (
        <View>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{params.card.name}</Text>
          <View style={{alignItems: 'center'}}>
            <Text>{"\n"}Phone number:</Text>
            <TouchableOpacity onPress={() => Communications.phonecall(details.international_phone_number.replace(/[^0-9]/g, ""), false)}>
              <Text>{details.formatted_phone_number}</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text>{"\n"}Address</Text>
            <TouchableOpacity onPress={() =>this.openGPS(params.card.geometry.location.lat, params.card.geometry.location.lng)}>
              <Text>{details.formatted_address.split(",").slice(0, 2).join(",")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {this.renderDetails()}
        <View style={styles.mapView}>
          <TouchableOpacity onPress={() => this.openGPS(params.card.geometry.location.lat, params.card.geometry.location.lng)}>
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
          </TouchableOpacity>
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
