'use strict';
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';

export default class CardPhotoComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var photoView = null;

    if(this.props.photo){
      photoView = <FastImage style={{width : 200, height: 200, borderRadius: 10}}
          source={{
            uri: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
                    this.props.photo[0].photo_reference +
                    '&sensor=false&maxheight=400&maxwidth=400&key=' + Config.GOOGLE_MAPS_API_KEY,
            headers:{},
            priority: FastImage.priority.normal,
            }}/>
    }else{
      photoView = <Image style={{width: 200, height: 200, borderRadius: 10}} source={require('../../assets/noImage.png')} />;
    }
    return (
      <View>
        {photoView}
      </View>
    );
  }
}
