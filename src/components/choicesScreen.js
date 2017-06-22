import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Config from 'react-native-config'
import Swiper from 'react-native-deck-swiper';


export default class choicesScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      cards: ["0"],
      swipedAllCards: false,
      swipeDirection: "",
      isSwipingBack: false,
      cardIndex: 0
    };
  }
  renderCard = card => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card.name}</Text>
      </View>
    );
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    );
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) =>{
      fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        position['coords']['latitude'] + ',' + position['coords']['longitude'] +
        '&radius=3000&types=restaurant&key=' + Config.GOOGLE_MAPS_API_KEY, {
        method:'GET',
        headers: {
          'Accept': 'application/json'
        }})
        .then((response) => response.json())
        .then((responseJson) =>{
          console.log(responseJson.results);
          this.setState({cards : responseJson.results});
        })
        .catch((error) =>{
          console.error(error);
        });

    },
    (error)=>{
      console.log(error);
    });
  }
  static navigationOptions = {
    title: 'Choices',
  };
  render() {

    const { params } = this.props.navigation.state;
    return (
     <View style={styles.container}>
       <Swiper
         ref={swiper => {
           this.swiper = swiper;
         }}
         onSwiped={this.onSwiped}
         cards={this.state.cards}
         cardIndex={this.state.cardIndex}
         cardVerticalMargin={80}
         renderCard={this.renderCard}
         onSwipedAll={this.onSwipedAllCards}
       >
         <Button onPress={this.swipeBack} title="Swipe Back" />
       </Swiper>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  box1: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#FF7F7F"
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent"
  }
});
