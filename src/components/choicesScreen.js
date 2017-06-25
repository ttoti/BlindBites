import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';
import Config from 'react-native-config'
import Swiper from 'react-native-deck-swiper';
import Toast, {DURATION} from 'react-native-easy-toast'
import {MKButton, MKColor} from 'react-native-material-kit';

const ColorFab = MKButton.coloredFab().build();

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
    const { navigate } = this.props.navigation;
    // <Text style={styles.text}>{card.price_level}</Text>
    // <Text style={styles.text}>{card.rating}</Text>
    // <TouchableHighlight onPress={() => navigate('Information')} underlayColor="white">
    // </TouchableHighlight>
    return (
      <View style={styles.card}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Image
            style={{width: 200, height: 200, borderRadius: 10}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          </View>
        <Text style={styles.text}>{card.name}</Text>
        <ColorFab
            backgroundColor={'#F9F9EA'}
            shadowRadius={1}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.6}
            shadowColor="black"
            style={styles.button}
            onPress={this.pushInfoButton}
        />
      </View>
    );
  }

  pushInfoButton = () => {
    const { navigate } = this.props.navigation;
    navigate('Information');
  }

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
  swipeRight = () => {
    this.swipeBack();
    const { navigate } = this.props.navigation;
    navigate('Selection');
  }
  swipeLeft = () => {
    this.refs.toast.show('Card removed',DURATION.LENGTH_LONG);
  }

  shuffleResults = (results) => {
    var currentIndex = results.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = results[currentIndex];
      results[currentIndex] = results[randomIndex];
      results[randomIndex] = temporaryValue;
    }
    return results;
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        position['coords']['latitude'] + ',' + position['coords']['longitude'] +
        '&radius=3000&types=restaurant&key=' + Config.GOOGLE_MAPS_API_KEY, {
        method:'GET',
        headers: {
          'Accept': 'application/json'
        }})
        .then((response) => response.json())
        .then((responseJson) =>{
          var shuffledCards = this.shuffleResults(responseJson.results);
          this.setState({cards : shuffledCards});
          this.forceUpdate();
          console.log(this.state.cards);
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

    return (
     <View style={styles.container}>
       <Swiper
         ref={swiper => {
           this.swiper = swiper;
         }}
         onSwipedRight={this.swipeRight}
         onSwipedLeft={this.swipeLeft}
         cards={this.state.cards}
         marginTop={50}
         marginBottom={150}
         renderCard={this.renderCard}
         onSwipedAll={this.onSwipedAllCards}
         backgroundColor={"#FF7F7F"}
         disableBottomSwipe={true}
         disableTopSwipe={true}
         animateOpacity={true}
       />
       <Toast
          ref="toast"
          style={{backgroundColor:'grey'}}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'white'}}
        />
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
    backgroundColor: "white",
  },
  button: {
    height: 20,
    justifyContent: 'center',
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "transparent",
    paddingTop: 5,
  }
});
