
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, PanResponder, Animated} from 'react-native';
import App from './Questionv2.js'

const {height,width} = Dimensions.get('window')

export default class Question extends Component{
	constructor(props){
		super(props);
		this.state = {
			pan: new Animated.ValueXY()
		};
	}

componentWillMount(){
		this._panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {this.state.pan.setValue({x:0,y:0});},
    onPanResponderMove: Animated.event([null, {dx: this.state.pan.x , dy: this.state.pan.y}]),
    onPanResponderRelease: () => Animated.spring(this.state.pan,{toValue:{x:0,y:0}}).start()
	})
}


  render(){
  	const {pan} = this.state;
    let rotateDeg = pan.x.interpolate({
      inputRange:[-350,350],
      outputRange:['-45deg','45deg']
    })
  	const viewStyle = {transform: [{translateX: pan.x}, {translateY:pan.y}, {rotate:rotateDeg}]}

    return(
      <Animated.View style={[styles.container, viewStyle]} {...this._panResponder.panHandlers}>
        <App />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container:{
    flex:1,
  	justifyContent:'center',
  },
});