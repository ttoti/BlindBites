import React, {Component} from 'react';
import {Image, Modal, Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';
import Config from 'react-native-config'
import Swiper from 'react-native-deck-swiper';
import Toast, {DURATION} from 'react-native-easy-toast'
import {MKSpinner} from 'react-native-material-kit';

import CardComp from './CardComp';

const SingleColorSpinner = MKSpinner.singleColorSpinner().build();

export default class choicesScreen extends Component {
    constructor(props) {
    super(props);
    this.callModal = this.callModal.bind(this);
    this.state = {
      cards: ["0"],
      swipedAllCards: false,
      swipeDirection: "",
      isSwipingBack: false,
      cardIndex: 0,
      currentCardIndex: 0,
      modalVisible: false,
      latitude: 0,
      longitude: 0,
    };
  }

  static navigationOptions = {
    title: 'Choices',
  };
  setModalVisible = (visible) => this.setState({ modalVisible: visible });

  renderCard = (card) => { return (<CardComp card={card} callbackModal={this.callModal} gps={[this.state.latitude, this.state.longitude]}/>) };

  onSwipedAllCards = () => this.setState({ swipedAllCards: true });

  callModal = () => {
    var currentCard = this.state.cards[this.state.currentCardIndex];
    this.setModalVisible(true);
    console.log(currentCard);
  }

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => this.setState({ isSwipingBack: isSwipingBack }, cb);

  swipeRight = () => {
    //When card swiped right, goes to another page
    //TODO
    this.swipeBack();
    const { navigate } = this.props.navigation;
    navigate('Selection');
  };

  swipeLeft = () => {
    //When card swiped left, remove
    this.refs.toast.show('Card removed',DURATION.LENGTH_LONG);
    this.state.currentCardIndex++;
  };

  shuffleResults = (results) => {
    //Shuffles and returns the results
    var currentIndex = results.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = results[currentIndex];
      results[currentIndex] = results[randomIndex];
      results[randomIndex] = temporaryValue;
    }
    return results;
  };

  renderSwiper = () => {
    //TODO: Fix perfomance issue, might have to do with React Navigation
    if (this.state.swipedAllCards) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Card stack is empty.</Text>
        </View>
        );
    } else {
        if(this.state.cards[0] === "0"){
          return (
            <View style={styles.emptyView}>
              <SingleColorSpinner style={styles.loadingSpinner} strokeColor="white" strokeWidth={4} />
            </View>
          );
        } else {
          return (
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
          );
        }
    }
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
          this.setState({latitude: position['coords']['latitude'], longitude: position['coords']['longitude']})
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

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {this.renderSwiper()}
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
  container: {
    flex: 1,
    backgroundColor: "#FF7F7F",
  },
  emptyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  loadingSpinner: {
    width: 150,
    height: 150,
  },
});
