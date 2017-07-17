'use strict';
import React, {Component} from 'react';
import Config from 'react-native-config';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class PhotoSwiperComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var photoView;
    if(this.props.photos != null){
      photoView = (
        <View style={styles.imageSwiperView}>
          <Swiper width={SCREEN_WIDTH * .85} style={styles.wrapper} height={250}
            renderPagination={renderPagination}
            paginationStyle={{
              bottom: -23, left: null, right: 10
            }} loop={false}>
              {
                this.props.photos.map((key, index) => {
                return(
                  <View style={styles.slide} key={key} title={<Text>{index}</Text>}>
                    <Image style={styles.image} source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
                      key.photo_reference + '&sensor=false&maxheight=500&maxwidth=800&key=' +
                      Config.GOOGLE_MAPS_API_KEY}} />
                  </View>
                );
              })
            }
          </Swiper>
        </View>
      );
    }else{
      photoView = (
        <View style={{alignItems: 'center'}}>
          <Image style={{width: 200, height: 200, borderRadius: 10}}
            source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/ef/50/ca/ef50ca35e6a867583bb5deb8e457c3df.jpg"}}
           />
        </View>
      );
    }

    return (
      <View>
        {photoView}
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
      borderWidth: 2,
      borderColor: '#323232',
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
  image: {
    width,
    flex: .7,
  },
  imageSwiperView: {
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  wrapper: {
  },
});
