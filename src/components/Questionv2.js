/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Button, Dimensions, TouchableOpacity, ProgressViewIOS, Text} from 'react-native';

const AnsBtn = (props) => {
  return(
    <View>
    <TouchableOpacity onPress={props.onPress} activeOpacity = {0.8}>
      <View style={styles.btnsContainer}>
        <Text style={styles.questionText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
    </View>
  )}


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
        <View style={{flex:1, justifyContent:'flex-end'}}>
          <View style={styles.qnContainer}>
            <Text style={styles.questionText}>{this.state.question[0]}</Text>
          </View>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
          <View style={{flex:1,justifyContent:'center'}}><View style={{borderBottomWidth: 1, borderBottomColor:'rgb(190,190,190)', width:barWidth}} /></View>
          <View style={{flexDirection:'row',flex: 1, justifyContent:'space-around', width:width*0.8}}>
              <AnsBtn text={"Yes" + this.state.count.yes} onPress={() => this._btnHandler('y')}/>
              <AnsBtn text={"No" + this.state.count.no} onPress={() => this._btnHandler('n')}/>
          </View>
          <ProgressViewIOS progressImage="./src/assets" progress={this._calcResult()} style={{flex : 2,width:barWidth}}/>
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
    height: 200,
    width: width*0.8,
    backgroundColor:'rgb(153,153,153)',
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
    height: 70,
    width: (width * 0.6) / 2,
    backgroundColor:'rgb(153,153,153)',
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"
  },

});
