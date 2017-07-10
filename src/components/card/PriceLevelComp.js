'use strict';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import StarRating from 'react-native-star-rating';

export default class DistanceComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var priceLevelView = null;
    if(this.props.priceLevel){
      priceLevelView = <StarRating disabled={true} fullStar={'dollar'} emptyStar={'minus'}
        iconSet={'FontAwesome'} maxStars={4} rating={this.props.priceLevel} starColor={'green'}
        starSize={20} />
    }else{
      priceLevelView = <Text style={{textAlign: 'center'}}>N/A</Text>;
    }
    return (
      <View>
        {priceLevelView}
      </View>
    );
  }
}
