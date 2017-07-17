'use strict';
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ReviewsComp from './ReviewsComp';

export default class DetailsComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var hoursIndex, hours, website, details, detailsView;
    var dayOfWeek = new Date().getDay();
    if(dayOfWeek == 0){
      hoursIndex = 6;
    }else{
      hoursIndex = (dayOfWeek - 1);
    }
    details = this.props.details;

    hours = details.opening_hours.weekday_text[hoursIndex];
    hours = hours.substring(hours.indexOf(':') + 1, hours.len);

    if(details.website != null){
      website = (<Text style={{color: '#FF7F7F', fontSize: 15, textAlign: 'center'}}
                    onPress={() => Linking.openURL(this.props.details.website)}>Website</Text>);
    }else{
      website = <View></View>
    }
    detailsView =  (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
        {website}
        <Text style={styles.hours}>{"\n"}Hours for today: {"\n"}{hours}{"\n"}</Text>
      </View>
    );

    return (
      <View>
        {detailsView}
        <ReviewsComp reviews={details.reviews}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  hours: {
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  }
})
