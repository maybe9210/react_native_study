/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {RootStore} from './app/mobx';

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import DetailsScreen from './app/screen/DetailScreen';
import HomeScreen from './app/screen/HomeScreen';
import SecondScreen from './app/screen/SecondScreen';
import ThirdScreen from './app/screen/ThirdScreen';
import ModalScreen from './app/screen/ModalScreen';
import { Provider } from 'mobx-react';
import { RegisterScreen } from './app/screen/RegisterScreen';


const HomeStack = createStackNavigator({
  Home : {screen : HomeScreen},
  Details : {screen : DetailsScreen}
})

const SecondStack = createStackNavigator({
  Second : { screen : SecondScreen},
  Details : {screen: DetailsScreen}
});

const ThirdStack = createStackNavigator({
  Thrid : { screen : ThirdScreen },
  Details : { screen : DetailsScreen}
});

const BottomTab = createBottomTabNavigator({
  Home : HomeStack,
  Second : SecondStack,
  Third : ThirdStack
})

const RegisterStack = createStackNavigator({
  MyModal : ModalScreen,
  Registration : RegisterScreen
})
const RootStack = createStackNavigator({
  Main : BottomTab,
  MyModal : RegisterStack
}, {
  mode : 'modal',
  headerMode : 'none',
})
const NavigatorFrame = createAppContainer(RootStack);
export default class App extends Component{
  render(){
    return(
        <Provider store={new RootStore()}>
          <NavigatorFrame/>
        </Provider>
    )
  }
} 
