'use strict';
import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import StarRating from 'react-native-star-rating';

export default class reviewCardComp extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const theme = getTheme();
    var review = this.props.review;
    return (
      <View style={theme.cardStyle}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style={styles.cardImage} source={{uri: review.profile_photo_url}} />
          <Text style={theme.cardContentStyle}>By: {review.author_name}</Text>
        </View>
        <Text style={theme.cardContentStyle}>
          {review.text}
        </Text>
        <View style={styles.stars}>
          <StarRating
            disabled={true}
            maxStars={5}
            emptyStar={'star-o'}
            halfStar={'star-half'}
            fullStar={'star'}
            starColor={'#E1E100'}
            iconSet={'FontAwesome'}
            rating={review.rating}
            starSize={20}
          />
        </View>
      </View>
   );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  stars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  }
});
