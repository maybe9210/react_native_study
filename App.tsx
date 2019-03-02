/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal} from 'react-native';

import { ItemStore } from './app/mobx/itemStore';

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import DetailsScreen from './app/screen/DetailScreen';
import HomeScreen from './app/screen/HomeScreen';
import SecondScreen from './app/screen/SecondScreen';
import ThirdScreen from './app/screen/ThirdScreen';
import ModalScreen from './app/screen/ModalScreen';
import { Provider } from 'mobx-react';

const itemStore = new ItemStore();

const HomeStack = createStackNavigator({
  Home : {screen : HomeScreen},
  Details : {screen : DetailsScreen}
})

const RootStack = createStackNavigator({
  Main : HomeStack,
  MyModal : ModalScreen
}, {
  mode : 'modal',
  headerMode : 'none'
})
const SecondStack = createStackNavigator({
  Second : { screen : SecondScreen},
  Details : {screen: DetailsScreen}
});

const ThirdStack = createStackNavigator({
  Thrid : { screen : ThirdScreen },
  Details : { screen : DetailsScreen}
});

const NavigatorFrame = createAppContainer(createBottomTabNavigator({
  Home : RootStack,
  Second : SecondStack,
  Third : ThirdStack
}))
export default class App extends Component{
  render(){
    return(
        <Provider store={itemStore}>
          <NavigatorFrame/>
        </Provider>
    )
  }
} 
