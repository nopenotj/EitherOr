/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Button, Dimensions, TouchableOpacity, Text} from 'react-native';
import colors from './colors.js'

const AnsBtn = (props) => {

  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity onPress={props.onPress} activeOpacity = {0.8}>
      <View style={[styles.btnsContainer,{backgroundColor:props.color}]}>
        <Text style={styles.btnText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
    </View>
  )}

const ProgressBar = (props) => {
  let {progress} = props;
  let rProgress = 1 - progress
  return(
    <View style={[props.style, {flexDirection:'row'}]}>
      <View style={{height:"50%",width:progress*100+"%", backgroundColor:colors.blue}}/>
      <View style={{height:"50%",width:rProgress*100+"%", backgroundColor:colors.red}}/>
    </ View>
  )


let {height,width} = Dimensions.get('window')
const barWidth = width*0.7

type Props = {};




export default class App extends Component<Props> {

  constructor(Props){
    super(Props);
    this.state = {
      question : ["Does gender inequality exist in Singapore?"],
      count: {yes: 1, no:2}
    };
  }

  _btnHandler = (type) => {
    switch(type){

      case 'y' :
        this.setState(prev => {return {count: { yes: prev.count.yes+1 , no:prev.count.no}}})
        break;
      case 'n' :
        this.setState(prev => {return {count: { yes: prev.count.yes , no:prev.count.no+1}}})
        break;
    }
  }

  _calcResult = ()=>{
    if(this.state.count.yes && this.state.count.no) 
      return this.state.count.yes / (this.state.count.yes+this.state.count.no)
    else{ return 0;}
  }



  render() {
    
    return(
      <View style={styles.container}>

        <View style={{flex:1, justifyContent:'center'}}>
          <View style={styles.qnContainer}>
            <Text style={styles.questionText}>{this.state.question[0]}</Text>
          </View>
        </View>
  

        <View style={{flex:1, alignItems:'center'}}>
          <ProgressBar progress={this._calcResult()} style={{flex : 1,width:barWidth}}/>
          <View style={{flexDirection:'row',flex: 3, justifyContent:'space-between', width:width*0.8}}>
              <AnsBtn text={"Yes" + this.state.count.yes} onPress={() => this._btnHandler('y')} color={colors.blue}/>
              <AnsBtn text={"No" + this.state.count.no} onPress={() => this._btnHandler('n')} color={colors.red}/>
          </View>
        </View>

      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:25,

  },
  qnContainer: {
    justifyContent:"center",
    alignItems:"center"
  },
  questionText:{
    color:"black",
    fontSize:25,
    padding: 20,
    fontFamily:"Georgia",
    fontWeight:'500',
    textAlign:"center",
  },
  btnsContainer: {
    padding:10,
    justifyContent:"center",
    alignItems:"center"
  },
  btnText: {
    color:"white",
    fontSize:25,
    padding: 20,
    fontFamily:"Georgia",
    fontWeight:'500',
    textAlign:"center",
  }

});
