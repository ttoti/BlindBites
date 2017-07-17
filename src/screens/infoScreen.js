'use strict';
import React, {Component} from 'react';
import {Image, Linking, Text, View, StyleSheet, Button, Dimensions, ScrollView} from 'react-native';
import Config from 'react-native-config';

import {MKSpinner} from 'react-native-material-kit';
import Swiper from 'react-native-swiper';

import DetailsComp from '../components/info/DetailsComp';
import ReviewsComp from '../components/info/ReviewsComp';
import PhotoSwiperComp from '../components/info/PhotoSwiperComp';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;
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


  renderDetails = () =>{
    var hoursIndex, hours;
    const { params } = this.props.navigation.state;
    if(this.state.resDetails != null){
      let website = null, reviews = null;
      var dayOfWeek = new Date().getDay();
      if(dayOfWeek == 0){
        hoursIndex = 6;
      }else{
        hoursIndex = (dayOfWeek - 1);
      }
      hours = this.state.resDetails.opening_hours.weekday_text[hoursIndex];
      hours = hours.substring(hours.indexOf(':') + 1, hours.len);

      if(this.state.resDetails.website != null){
        website = (<Text style={{color: '#FF7F7F', fontSize: 15, textAlign: 'center'}}
                      onPress={() => Linking.openURL(this.state.resDetails.website)}>Website</Text>);
      }else{
        website = <View></View>
      }
      return (
        <View>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{params.card.name}</Text>
          {website}
          <Text style={styles.detailsText}>{"\n"}Hours for today: {"\n"}{hours}{"\n"}</Text>
          <ReviewsComp reviews={this.state.resDetails.reviews}/>
        </View>
      );
    }
  }

  renderPhotos = () => {
    if(this.state.resDetails != null){
      return (
        <PhotoSwiperComp photos={this.state.resDetails.photos} />
      )
    }else{
      return (
            <View style={styles.emptyView}>
                <SingleColorSpinner style={styles.loadingSpinner} strokeColor="grey" strokeWidth={3} />
              </View>
            );
      }
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
     <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {this.renderPhotos()}
        {this.renderDetails()}
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
  },
  wrapper: {
  },
});
