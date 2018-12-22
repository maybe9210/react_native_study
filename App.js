import React, { Component } from 'react';
import { View } from 'react-native';

export default class FixedDimenstionBasics extends Component {
  render() {
    return (
      // <View>
      //   <View style={{width:50, height:50, backgroundColor:'powderblue'}} />
      //   <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
      //   <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      // </View>

      <View style={{flex:1}}>
        <View style={{flex:1, backgroundColor: 'skyblue'}} />
        <View style={{flex:2, backgroundColor: 'powderblue'}} />
        <View style={{flex:3, backgroundColor: 'steelblue'}} />
      </View>
    )
  }
}