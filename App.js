import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };

    setInterval(()=>{
      console.log(new Date());
      this.setState(previousState => (
        {
          isShowingText: !previousState.isShowingText
        }
      ))
    },1000);
  }

  render() {
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <Text>{this.props.text}</Text>
    )
  }
}
export default class BlinkApp extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Blink text='Rexxar' />
        <Blink text='Jaina' />
        <Blink text='Valeera111111' />
        <Blink text='Valeera222222' />
        <Blink text='Valeera333333' />
        <Blink text='Valeera444444' />
      </View>
    )
  }
}
