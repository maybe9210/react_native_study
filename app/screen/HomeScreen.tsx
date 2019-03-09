import React from 'react';
import {Button,Text,View, StyleSheet, CameraRoll} from 'react-native';
import { observer, inject, Provider } from 'mobx-react';

import { Input, Title, List } from '../components';
import { Item } from '../const';

import { NavigationScreenProp } from 'react-navigation';
import { RootStore, ItemStore} from '../mobx';
import { isComputedProp } from 'mobx';

interface Props {
  store? : RootStore,
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
    const store = this.props.store as RootStore;
    
    // store.itemStore.getAllTodos();
  }

  render() {
    const rootStore = this.props.store as RootStore;
    const store = rootStore.itemStore as ItemStore;
    const navigation = this.props.navigation;

    
    return (
      <View style={styles.container}>
        <Title goto={()=> navigation.navigate('MyModal')} fontSize={30}>+</Title>
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