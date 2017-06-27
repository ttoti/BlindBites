import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button} from 'react-native';
import {MKButton, MKColor} from 'react-native-material-kit';
import StarRating from 'react-native-star-rating';

const ColorFab = MKButton.coloredFab().build();

export default class CardComp extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    // <Text style={styles.text}>{card.price_level}</Text>
    // <Text style={styles.text}>{card.rating}</Text>
    return (
      <View style={styles.card}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Image
            style={{width: 200, height: 200, borderRadius: 10}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.text}>{this.props.card.name}</Text>
          <ColorFab
            backgroundColor={'#F9F9EA'}
            shadowRadius={1}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.6}
            shadowColor="black"
            style={styles.button}
            onPress={this.props.callbackModal}
          />
        </View>

        <StarRating
          disabled={true}
          maxStars={5}
          emptyStar={'star-o'}
          halfStar={'star-half'}
          fullStar={'star'}
          iconSet={'FontAwesome'}
          rating={this.props.card.rating}
        />
        <StarRating
          disabled={true}
          fullStar={'dollar'}
          emptyStar={'minus'}
          iconSet={'FontAwesome'}
          maxStars={4}
          rating={this.props.card.price_level}
          starColor={'green'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
  },
  button: {
    height: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    backgroundColor: "transparent",
    paddingRight: 10,
    paddingTop: 5,
  }
});
