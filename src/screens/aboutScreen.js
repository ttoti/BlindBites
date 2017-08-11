import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

export default class aboutScreen extends Component {
  state = {
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
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
      </View>
    )
  }

}
