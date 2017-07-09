'use strict';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import StarRating from 'react-native-star-rating';

export default class RatingComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var starRatingView = null;
    if(this.props.rating){
      starRatingView = <StarRating disabled={true} maxStars={5} emptyStar={'star-o'}
        halfStar={'star-half-o'} fullStar={'star'} starColor={'#E1E100'} iconSet={'FontAwesome'}
        rating={this.props.rating} starSize={20} />
    }else{
      starRatingView = <Text style={{textAlign: 'center'}}>N/A</Text>;
    }
    return (
      <View>
        {starRatingView}
      </View>
    );
  }
}
