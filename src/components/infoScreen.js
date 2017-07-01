import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button, Dimensions, ScrollView} from 'react-native';
import Config from 'react-native-config'
import MapView from 'react-native-maps';
import {MKSpinner} from 'react-native-material-kit';
import Swiper from 'react-native-swiper';

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
    if(this.state.resDetails != null){
      if(this.state.resDetails.photos != null){
        return (
          <View style={styles.imageSwiperView}>
            <Swiper width={SCREEN_WIDTH * .85} style={styles.wrapper} height={240}
              renderPagination={renderPagination}
              paginationStyle={{
                bottom: -23, left: null, right: 10
              }} loop={false}>
                {
                  this.state.resDetails.photos.map((key, index) => {
                  return(
                    <View style={styles.slide} key={key} title={<Text>{index}</Text>}>
                      <Image style={styles.image} source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + key.photo_reference
                              + '&sensor=false&maxheight=500&maxwidth=800&key=' + Config.GOOGLE_MAPS_API_KEY}} />
                    </View>
                  );
                })
              }
            </Swiper>
          </View>
        );
      }
      else{
        return (
          <View style={{alignItems: 'center'}}>
            <Image style={{width: 200, height: 200, borderRadius: 10}} source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/ef/50/ca/ef50ca35e6a867583bb5deb8e457c3df.jpg"}} />
          </View>
        );
      }

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


const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: 20,
      right: 45,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#323232',
    }}>
      <Text style={{ color: 'grey'}}>
        <Text style={{
          color: 'white',
          fontSize: 20
        }}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
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
  image: {
    width,
    flex: .7,
  },
  imageSwiperView: {
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 150,
    height: 150,
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
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  wrapper: {
  },
});
