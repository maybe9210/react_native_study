import React, { Component } from 'react';
import { Alert, Text, Button, StyleSheet, View , SafeAreaView, Platform, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';

export default class BUtton extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!!');
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!!');
  }

  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor: '#e6e6e6'}}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton}
              title='Press Me'>
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton}
              title='press me'
              color='#841584'>
              </Button>
          </View>
          <View style={styles.alternativeLayoutButtonContainer}>
            <Button
              onPress={this._onPressButton}
              title='This looks great!'
              />
              <Button
                onPress={this._onPressButton}
                title='ok'
                color='#841584'
                />
          </View>
        </View>

        <View style={styles.container}>
          <TouchableHighlight onPress={this._onPressButton} underlayColor='white'>
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableHighlight</Text>
            </View>
          </TouchableHighlight>
          <TouchableOpacity onPress={this._onPressButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableOpacity</Text>
            </View>
          </TouchableOpacity>
          <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableWithoutFeedback
            onPress={this._onPressButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.button}>
              <Text style={styles.buttonText}>Touchabel with Long Press</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    padding: 20,
    color: 'white',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})