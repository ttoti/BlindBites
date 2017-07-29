'use strict';
import React, {Component} from 'react';
import {Linking, Platform, Text, TouchableOpacity, View} from 'react-native';
import Communications from 'react-native-communications';

export default class SelDetailsComp extends Component {
  constructor(props) {
    super(props);
  }
  openGPS = (lat, lng) =>{
    var scheme = Platform.OS === 'ios' ? 'http://maps.apple.com/?daddr=' : 'geo:'
    var url = scheme + lat + ',' + lng;
    console.log(url);
    Linking.openURL(url);
  }

  render() {
    var details = this.props.resDetails;
    var openNow = null;
    if(details.opening_hours.open_now){
      openNow = <Text style={{color: 'green'}}>Open Now</Text>
    }else{
      openNow = <Text style={{color: 'red'}}>Currently closed</Text>
    }
    return (
      <View>
        <Text style={{fontSize: 25, textAlign: 'center'}}>{this.props.name}</Text>
        <View style={{paddingTop: 10, alignItems: 'center'}}>
          {openNow}
          <Text>{"\n"}Phone number:</Text>
          <TouchableOpacity onPress={() => Communications.phonecall(details.international_phone_number.replace(/[^0-9]/g, ""), false)}>
            <Text style={{color: '#FF7F7F'}}>{details.formatted_phone_number}{"\n"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Address:</Text>
          <TouchableOpacity onPress={() =>this.openGPS(this.props.gps.lat, this.props.gps.lng)}>
            <Text style={{color: '#FF7F7F'}}>{details.formatted_address.split(",").slice(0, 2).join(",")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
