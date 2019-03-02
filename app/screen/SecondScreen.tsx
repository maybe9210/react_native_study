import React from 'react';
import {Button,Text,View} from 'react-native';

export default class SecondScreen extends React.Component<{navigation:any}> {
  static navigationOptions = {
    title: 'Second',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        {/* <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Doctors')}
        /> */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

