/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { observer, inject, Provider } from 'mobx-react';

import Title from './app/components/Title';
import Input from './app/components/Input';
import List from './app/components/List';
import Footer from './app/components/Footer';

import { ItemStore } from './app/mobx/itemStore';
import { Item } from './app/const';
import {Camera, Photolist} from './app/components/Camera';

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import DetailsScreen from './app/screen/DetailScreen';
import HomeScreen from './app/screen/HomeScreen';
import SecondScreen from './app/screen/SecondScreen';
import ThirdScreen from './app/screen/ThirdScreen';

type Props = {
  store? : ItemStore
}
type State = {
  items : Item[]
}

@inject("store")
@observer
class Container extends Component<Props, State> {
  constructor(props : Props){
    super(props);
    const store = this.props.store as ItemStore;
    
    store.getAllTodos();
  }

  render() {
    const store = this.props.store as ItemStore;
    
    return (
      <View style={styles.container}>
        <Title> Todo List </Title>
        <Input
          placeholder={'Enter an item!'}
          onSubmit={store.addTodo.bind(store)}
          />
        <View style={styles.divider}/>
        
        <List
          items={store.items}
          onRemoveItem={store.removeItem.bind(store)}
          onToggleItemCompleted={store.toggleCompleted.bind(store)}
          />
        <View style={styles.divider} />
        <Camera />
        <Photolist />
        <Footer  
          onRemoveCompleted={store.removeCompleted.bind(store)} 
          />
      </View>
    )
  }
}
const itemStore = new ItemStore();

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

const Frame = createAppContainer(createBottomTabNavigator({
  Home : HomeStack,
  Second : SecondStack,
  Third : ThirdStack
}))
export default class App extends Component{
  render(){
    return(
        <Provider store={itemStore}>
          <Frame/>
        </Provider>
    )
  }
} 
 
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1.0)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loading : {
    flex : 1,
    backgroundColor: 'rgba(255,255,255,1.0)',
    justifyContent : 'center',
    alignItems : 'center'
  }
});