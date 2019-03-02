import React from 'react';
import {Button,Text,View, StyleSheet} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any,any>
}

export default class ModalScreen extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text : { fontSize: 30 }
});