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

import ItemStore from './app/mobx/ItemStore';
import { observable } from 'mobx';

import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, gql} from 'apollo-boost';
import { onError } from 'apollo-link-error';
import {ApolloProvider, Query} from 'react-apollo';

import SCHEMA from './app/graphql/todosShema';

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
  store? : ItemStore
}
interface State {
  items : Item[]
}

const httpLink = new HttpLink({
  uri : 'https://api-apeast.graphcms.com/v1/cjshaau0241lj01ckeov1u72p/master',
  headers : {
    authorization : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNmMyY2I2OWMtNTVmNi00YmViLTkxYzktNTM2YzNiODlhMzQxIn0._zvbPaJoPnivqMEQI5vr4cdylOBODtRoH_G3M7ADp3M`
  }
});
const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError}) =>{
  if (graphQLErrors){

  }

  if (networkError){

  }
});
const link = ApolloLink.from([errorLink, httpLink]);
const client = new ApolloClient({
  link,
  cache
});

@inject("store")
@observer
class Container extends Component<Props, State> {
  constructor(props : Props){
    super(props);
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
        <Footer  
          onRemoveCompleted={store.removeCompleted.bind(store)} 
          />
      </View>
    )
  }
}

@inject("store")
class MobxContainer extends Component<Props,State> {
  constructor(props : Props){
    super(props);
  }
  render() {
    const store = this.props.store as ItemStore;
    console.log("store", store)
    return (
      <Query query ={SCHEMA.GET_TODOSES}>
        {({data, loading, error}) => {
          if(error) {
            store.addTodo(error.message);
            return (<Container />);
          }
          const {todoses} = data;
          if(loading || !todoses){
            // store.addTodo("Loading ....");
            return (<View style={styles.loading}><Text>Loading</Text></View>)
          }
          
          store.setTodos(todoses);
          return (
            <Container />
          ); 
        }}
      </Query>
    );
  }
}
const itemStore = new ItemStore();
export default class App extends Component{
  render(){
    return(
      <ApolloProvider client={client}>
        <Provider store={itemStore}>
          <MobxContainer/>
        </Provider>
      </ApolloProvider>
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