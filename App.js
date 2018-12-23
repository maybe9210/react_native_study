import React, { Component } from 'react';
import { Text, TextInput, View , SafeAreaView } from 'react-native';

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text:''};
  }
  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor: '#e6e6e6'}}>
      <View style={{padding: 10}}>
        <TextInput
          style={{height:40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => {this.setState({text})}}
        />
        <Text style={{padding: 10, fontSize:42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
      </SafeAreaView>
    )
  }
}