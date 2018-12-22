import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text> Hello {this.props.name} !!!</Text>
      </View>
    )
  }
}
export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera111111' />
        <Greeting name='Valeera222222' />
        <Greeting name='Valeera333333' />
        <Greeting name='Valeera444444' />
      </View>
    )
  }
}
