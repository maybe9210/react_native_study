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
import { observer } from 'mobx-react';

import Title from './app/components/Title';
import Input from './app/components/Input';
import List from './app/components/List';
import Footer from './app/components/Footer';

import ItemStore from './app/mobx/ItemStore';
import { observable } from 'mobx';

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
  // store : any
}
interface State {
  items : Item[]
}
@observer
export default class App extends Component<Props, State> {
  private store: ItemStore = new ItemStore();
  @observable items = [];
  constructor(props : Props){
    super(props);
    this.state = {
      items: []
    }
  }

  addItem = (inputText : string) => {
    const {items} = this.state;

    this.setState({
      items : [{label: inputText, completed: false}, ...items]
    });
  }

  removeItem = (index : number) => {
    const { items } = this.state;
    this.setState({
      items : items.filter((item, i) => i !== index)
    });
  }

  toggleItemCompleted = (index : number) => {
    const { items } = this.state;

    this.setState({
      items: items.map((item, i)=>{
        if(index === i) {
          return {
            label : item.label,
            completed : !item.completed
          }
        }
        return item;
      })
    })
  }

  removeCompleted = () => {
    const {items} = this.state;
    
    this.setState({
      items: items.filter((item, i) => item.completed === false)
    })
  }
  render() {
    const {items} = this.state;
    // const store = this.props.store;
    
    return (
      <View style={styles.container}>
        <Title> Todo List </Title>
        <Input
          placeholder={'Enter an item!'}
          onSubmit={this.store.addTodo.bind(this.store)}
          // onSubmit={this.addItem}
        />
        <View style={styles.divider}/>
        <List
          // items={items}
          // onRemoveItem={this.removeItem}
          // onToggleItemCompleted={this.toggleItemCompleted}
          items={this.store.items}
          onRemoveItem={this.store.removeItem.bind(this.store)}
          onToggleItemCompleted={this.store.toggleCompleted.bind(this.store)}
        />
        <View style={styles.divider} />
        <Footer 
          // onRemoveCompleted={this.removeCompleted} 
          onRemoveCompleted={this.store.removeCompleted.bind(this.store)} 
        />
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