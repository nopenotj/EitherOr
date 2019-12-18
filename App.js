/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, PanResponder} from 'react-native';

class DraggableView extends Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      pan : new Animated.ValueXY()
    };
  }

  componentWillMount(){
      Animated.timing(this.state.fadeAnim,{toValue:100,duration:5000,}).start();

      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {this.state.pan.setValue({x:0,y:0});},
        onPanResponderMove: Animated.event([null, {dx: this.state.pan.x , dy: this.state.pan.y}]),
        onPanResponderRelease: () => Animated.spring(this.state.pan,{toValue:{x:0,y:0}}).start()

      })

    }

  render(){
    const {pan} = this.state;
    const viewStyle = {transform: [{translateX: pan.x},{translateY: pan.y}]}

    return(
      <Animated.View style ={[styles.box, viewStyle]} opacity = {this.state.fadeAnim} {...this._panResponder.panHandlers} >
        {this.props.children}
      </Animated.View>


    );
  }

}

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={{flex:1 ,justifyContent:'center', alignItems:'center'}}>
        <DraggableView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box:{
    height:100,
    width:100,
    backgroundColor:'blue'
  },
});
