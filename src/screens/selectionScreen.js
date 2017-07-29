'use strict';
import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import {MKSpinner} from 'react-native-material-kit';

import SelDetailsComp from '../components/selection/SelDetailsComp';
import MapViewComp from '../components/selection/MapViewComp';

const SingleColorSpinner = MKSpinner.singleColorSpinner().build();

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
  render() {
    const { params } = this.props.navigation.state;
    var selectionView;
    if(this.state.resDetails){
      selectionView = (
        <View style={styles.view}>
          <View style={{paddingTop: 20}}>
            <SelDetailsComp name={params.card.name} resDetails={this.state.resDetails} gps={params.card.geometry.location}/ >
            <MapViewComp gps={params.card.geometry.location}/>
          </View>
        </View>
      );
    }else{
      selectionView = (
        <View style={styles.emptyView}>
          <SingleColorSpinner style={styles.loadingSpinner} strokeColor="white" strokeWidth={4} />
        </View>
      );
    }
    return (
     <View style={styles.container}>
      {selectionView}
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7F7F',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 150,
    height: 150,
  },
  view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 30,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 35,
  }
});
