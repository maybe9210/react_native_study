import React from 'react';
import {Button,Text,View} from 'react-native';
import { NavigationActions } from 'react-navigation';

interface Pass{
  navigation : {
    getParam : (title:string, defaultTitle:string)=>string
  }
}
export default class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}:Pass)=>{
    return {
      title : navigation.getParam('title', 'Default Title')
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}