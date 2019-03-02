import React from 'react';
import {Button,Text,View} from 'react-native';

export default class HomeScreen extends React.Component<{navigation:any}> {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        {/* <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        /> */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

