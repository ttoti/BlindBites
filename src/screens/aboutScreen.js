import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal';
import * as counterActions from '../actions/counterActions';

import Counter from '../components/common/counter';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class aboutScreen extends Component {
  state = {
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
    const {state, actions} = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._hideModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Counter counter={state.count} {...actions} />
      </View>
    )
  }

}
export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(aboutScreen);
