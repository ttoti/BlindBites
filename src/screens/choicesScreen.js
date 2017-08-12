import React, {Component} from 'react';
import {Button, Dimensions, Image, Modal, Platform, StyleSheet,Text, TouchableHighlight, View} from 'react-native';
import Config from 'react-native-config';
import Swiper from 'react-native-deck-swiper';
import {MKSpinner} from 'react-native-material-kit';

import CardComp from '../components/card/CardComp';
import Toast, {DURATION} from '../components/common/Toast';

import * as cardActions from '../actions/cardActions';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

const { height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SingleColorSpinner = MKSpinner.singleColorSpinner().build();

class choicesScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      cards: ["0"],
      swipedAllCards: false,
      swipeDirection: "",
      isSwipingBack: false,
      cardIndex: 0,
      currentCardIndex: 0,
      latitude: 0,
      longitude: 0,
    };
  }

  static navigationOptions = {
    title: 'Choices',
  };

  renderCard = (card) => { return (<CardComp card={card} infoCallback={this.callInfo} gps={[this.state.latitude, this.state.longitude]}/>) };

  onSwipedAllCards = () => this.setState({ swipedAllCards: true });

  callInfo = () => {
    const {navigate} = this.props.navigation;
    var currentCard = this.state.cards[this.state.currentCardIndex];

    if(Platform.OS === 'ios'){
      navigate('Information', {card: currentCard});
    }else{
      //TODO: Add info screen for android to fix jank
    }
  }
  undoDelete = () => {
    console.log("undo");
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
    const { navigate } = this.props.navigation;
    var currentCard = this.state.cards[this.state.currentCardIndex];
    navigate('Selection', {card: currentCard});
    this.swipeBack();
  };

  swipeLeft = () => {
    //When card swiped left, remove
    this.refs.undoToast.show('Card removed', DURATION.LENGTH_SHORT);
    this.state.currentCardIndex++;
  };
  swipeTop = () => {
    console.log("Saved");
    this.refs.saveToast.show('Card saved', DURATION.LENGTH_SHORT);
    this.state.currentCardIndex++;
  }

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
    const {state, actions} = this.props;
    if (this.state.swipedAllCards) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Card stack is empty.</Text>
        </View>
        );
    } else {
        if(state.cards == null){
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
              onSwipedTop={this.swipeTop}
              cards={state.cards.slice(this.state.currentCardIndex, this.state.cards.len)}
              renderCard={this.renderCard}
              onSwipedAll={this.onSwipedAllCards}
              backgroundColor={"#FF7F7F"}
              disableBottomSwipe={true}
              animateOpacity={true}
            />
          );
        }
    }
  }
  componentWillMount(){
    const { state, addCards, actions } = this.props;
    if(state.cards == null){
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
            actions.addCards(shuffledCards);
          })
          .catch((error) =>{
            console.error(error);
          });

      },
      (error)=>{
        console.log(error);
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderSwiper()}
        <Toast
          ref="undoToast"
          style={{backgroundColor:'grey'}}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'white'}}
          undoCallBack={this.undoDelete}
        />
        <Toast
          ref="saveToast"
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

export default connect(state => ({
    state: state.cards
  }),
  (dispatch) => ({
    actions: bindActionCreators(cardActions, dispatch)
  })
)(choicesScreen);
