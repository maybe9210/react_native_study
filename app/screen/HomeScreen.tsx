import React from 'react';
import {Button,Text,View, StyleSheet} from 'react-native';
import { observer, inject, Provider } from 'mobx-react';

import Title from '../components/Title';
import Input from '../components/Input';
import List from '../components/List';
import Footer from '../components/Footer';
import { Item } from '../const';
import { ItemStore } from '../mobx/itemStore';
import {Camera, Photolist} from '../components/Camera';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  store? : ItemStore,
  navigation: NavigationScreenProp<any,any>
}
interface State {
  items : Item[]
}

@inject("store")
@observer
export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props : Props){
    super(props);
    const store = this.props.store as ItemStore;
    
    store.getAllTodos();
  }

  render() {
    const store = this.props.store as ItemStore;
    // const navigation = this.props.navigation;

    console.log(typeof this.props.navigation);
    
    return (
      <View style={styles.container}>
        {/* <Title> Todo List </Title> */}
        <Input
          placeholder={'Enter an item!'}
          onSubmit={store.addTodo.bind(store)}
          />
        <View style={styles.divider}/>
        
        <List
          items={store.items}
          navigate={this.props.navigation.navigate}
          onRemoveItem={store.removeItem.bind(store)}
          onToggleItemCompleted={store.toggleCompleted.bind(store)}
          />
        <View style={styles.divider} />
        {/* <Camera /> */}
        {/* <Photolist /> */}
        {/* <Footer  
          onRemoveCompleted={store.removeCompleted.bind(store)} 
          /> */}
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
  loading : {
    flex : 1,
    backgroundColor: 'rgba(255,255,255,1.0)',
    justifyContent : 'center',
    alignItems : 'center'
  }
});