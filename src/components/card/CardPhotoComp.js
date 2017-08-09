'use strict';
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
import {MKSpinner} from 'react-native-material-kit';
const SingleColorSpinner = MKSpinner.singleColorSpinner().build();
const { height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;

export default class CardPhotoComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var photoView = <SingleColorSpinner style={styles.loadingSpinner} strokeColor="grey" strokeWidth={4} />;

    if(this.props.photo){
      photoView = <FastImage style={{width : SCREEN_HEIGHT * .32, height: SCREEN_HEIGHT * .32, borderRadius: 10}}
          source={{
            uri: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
                    this.props.photo +
                    '&sensor=false&maxheight=400&maxwidth=400&key=' + Config.GOOGLE_MAPS_API_KEY,
            headers:{},
            priority: FastImage.priority.high,
            }}/>
    }else{
      photoView = <Image style={{width: SCREEN_HEIGHT * .32, height: SCREEN_HEIGHT * .32, borderRadius: 10}} source={require('../../assets/noImage.png')} />;
    }
    return (
      <View style={{width: SCREEN_HEIGHT * .32, height: SCREEN_HEIGHT * .32, borderRadius: 10}}>
        {photoView}
      </View>
    );
  }
}
var styles = StyleSheet.create({
  loadingSpinner: {
    width: 225,
    height: 225,
  },
});
