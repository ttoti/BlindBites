'use strict';
import React, {Component} from 'react';
import {Image, Linking, Text, View, StyleSheet, Button, Dimensions, ScrollView} from 'react-native';
import Config from 'react-native-config';

import {MKSpinner} from 'react-native-material-kit';
import Swiper from 'react-native-swiper';

import DetailsComp from '../components/info/DetailsComp';
import PhotoSwiperComp from '../components/info/PhotoSwiperComp';

const SingleColorSpinner = MKSpinner.singleColorSpinner().build();

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

  render() {
    const { params } = this.props.navigation.state;
    var details, photo;
    if(this.state.resDetails){
      details = <DetailsComp name={params.card.name} details={this.state.resDetails} />
      photo = <PhotoSwiperComp photos={this.state.resDetails.photos} />
    }else{
      details = (
        <View style={styles.emptyView}>
          <SingleColorSpinner style={styles.loadingSpinner} strokeColor="grey" strokeWidth={3} />
        </View> );
      photo = <View></View>;
    }
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerView}>
          {photo}
          {details}
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
  emptyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  innerView: {
    paddingTop: 10,
  },
  loadingSpinner: {
    width: 150,
    height: 150,
  },
  scrollView: {
    flex: .9,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
