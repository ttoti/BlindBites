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
      photoView = <FastImage style={{width : 250, height: 250, borderRadius: 10}}
          source={{
            uri: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
                    this.props.photo[0].photo_reference +
                    '&sensor=false&maxheight=500&maxwidth=800&key=' + Config.GOOGLE_MAPS_API_KEY,
            headers:{},
            priority: FastImage.priority.normal,
            }}/>
    }else{
      photoView = <Image style={{width: 250, height: 250, borderRadius: 10}}
        source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/ef/50/ca/ef50ca35e6a867583bb5deb8e457c3df.jpg"}} />;
    }
    return (
      <View>
        {photoView}
      </View>
    );
  }
}
