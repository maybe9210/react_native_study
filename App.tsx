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

import Title from './app/components/Title';
import Input from './app/components/Input';
import List from './app/components/List';
import Footer from './app/components/Footer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Item {
  completed : boolean,
  label : string
}
interface Props {
  items : Item[]
}
export default class App extends Component<Props> {
  

  addItem = (item : Item) => {
    
  }

  removeItem = (index : number) => {
    
  }

  toggleItemCompleted = (index : number) => {
    
  }

  removeCompleted = () => {
    
  }
  render() {
    const {items} = this.props
    // const {items} = {
    //   items: [
    //     {
    //       label : "test 1",
    //       completed: false
    //     },{
    //       label : "test 2",
    //       completed: false
    //     }, {
    //       label : "test 3",
    //       completed: true
    //     }
    //   ]
    // };

    return (
      <View style={styles.container}>
        <Title> Todo List </Title>
        <Input
          placeholder={'Enter an item!'}
          onSubmit={this.addItem}
        />
        <View style={styles.divider}/>
        <List
          items={items}
          onRemoveItem={this.removeItem}
          onToggleItemCompleted={this.toggleItemCompleted}
        />
        <View style={styles.divider} />
        <Footer onRemoveCompleted={this.removeCompleted} />
      </View>
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
});