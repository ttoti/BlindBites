'use strict';
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import ReviewCardComp from './ReviewCardComp';

export default class ReviewsComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var reviewList;
    if(this.props.reviews){
      reviewList = this.props.reviews.splice(2).map((item, index) => {
        return <ReviewCardComp key={index} review={item}/>
      });
    }else{
      reviewList = <View></View>
    }
    return(
      <View>
        <Text style={styles.detailsText}>Recent reviews:</Text>
        {reviewList}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  detailsText: {
    fontSize: 15,
    textAlign: 'center'
  },
});
