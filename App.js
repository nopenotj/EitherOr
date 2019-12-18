/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Button, Dimensions, TouchableOpacity, ProgressViewIOS} from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import * as Progress from 'react-native-progress';
import {Card, Text} from 'react-native-elements'
import Confetti from 'react-native-confetti';

const AnsBtn = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress} activeOpacity = {0.8}>
      <Card containerStyle={styles.btnsContainer}>
        <Text style={styles.questionText}>{props.text}</Text>
      </Card>
    </TouchableOpacity>
  )}


let {height,width} = Dimensions.get('window')

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
    this._confettiView.startConfetti();
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
    let {height,width} = Dimensions.get('window');
    
    return(
      <View style={styles.container}>
        
        <View style={{flex:0.5}} />

        <View style={{flex:3, justifyContent:'center',alignItems:"center"}}>
          <Card containerStyle={styles.qnContainer}>
            <Text style={styles.questionText}>{this.state.question[0]}</Text>
          </Card>
        </View>

        
        <View style={{borderBottomColor:rgb(191,191,191), borderBottomWidth:1, width:300 }} />


        <View style={{flex:3, justifyContent:"center"}}>
          <View style={{flexDirection:'row',justifyContent:'space-between', flex: 2 , marginVertical:20}}>
            <AnsBtn text={"Yes\n" + this.state.count.yes} onPress={() => this._btnHandler('y')}/>
            <AnsBtn text={"No\n" + this.state.count.no} onPress={() => this._btnHandler('n')}/>
          </View>

          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          
          <ProgressViewIOS progressImage="./src/assets" progress={this._calcResult()} style={{width:300, height: 50}}/>

          </View>


        </View>

        <View style={{flex:0.5}} />
        <Confetti colors= {[rgb(0,0,255)]} ref={(node) => this._confettiView = node} timeout={30} duration ={2000}/>
      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rgb(242,242,242),

  },
  qnContainer: {
    height: 200,
    width: width*0.9,
    backgroundColor:rgb(153,153,153),
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"
  },
  questionText:{
    color:"white",
    fontSize:25,
    padding: 20,
    fontFamily:"Georgia",
    fontWeight:'500',
    textAlign:"left",
  },
  btnsContainer: {
    height: 150,
    width: (width * 0.8) / 2,
    backgroundColor:rgb(153,153,153),
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"
  },

});
