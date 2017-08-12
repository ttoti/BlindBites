/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 *
 * Modified by Tomas Hernandez for the use of BlindBites
 * https://github.com/ttoti/BlindBites
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export const DURATION = {
    LENGTH_LONG: 1250,
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const {height, width} = Dimensions.get('window');

export default class Toast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
            disabled: false,
        }
    }

    show(text, duration) {
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;

        this.setState({
            isShow: true,
            text: text,
        });

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start(() => {
            this.isShow = true;
            if(duration !== DURATION.FOREVER) this.close();
        });
    }

    close( duration ) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if(delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, delay);
      this.setState({disabled: false});
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let pos, undoButton;
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }
        if(this.props.undoCallBack){
          undoButton =
          <TouchableOpacity
              disabled={this.state.disabled} style={{paddingTop: 10}}
              onPress={ () => {this.setState({disabled: true}); this.props.undoCallBack();} }>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{width: 40}}>
                <Text style={{fontSize: 14, color: '#FFFFFF'}}>Undo</Text>
              </View>
              <View>
                <Icon name="undo" size={14} color="#FFFFFF"/>
              </View>
            </View>
          </TouchableOpacity>
        }else{
          undoButton = <View></View>
        }
        const view = this.state.isShow ?
            <View
                style={[styles.container, { top: pos }]}
                >
                <Animated.View
                    style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
                    >
                    <Text style={this.props.textStyle}>{this.state.text}</Text>
                    {undoButton}
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        color: 'white'
    }
});

Toast.propTypes = {
    style: View.propTypes.style,
    position: React.PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style,
    positionValue: React.PropTypes.number,
    fadeInDuration: React.PropTypes.number,
    fadeOutDuration: React.PropTypes.number,
    opacity: React.PropTypes.number
}

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
}
