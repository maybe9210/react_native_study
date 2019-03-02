import React from 'react';
import {Button,Text,View, StyleSheet, CameraRoll, ScrollView, Image} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any,any>
}

interface State {
  photos : any
}

export default class ModalScreen extends React.Component<Props, State> {
  static navigationOptions = {header:null};
  constructor(props: Props) {
    super(props);

    this.state = {
      photos : null
    }
  }
  
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
        first: 5,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };
 render() {
   if(this.state.photos === null){
     return (
      <View style={styles.container}>
        <Button title="Load Images" onPress={this._handleButtonPress} />
      </View>
     )
   }

  return (
    <View style={styles.container}>
      <Button title="Load Images" onPress={this._handleButtonPress} />
      <ScrollView>
        {this.state.photos.map((p, i) => {
        return (
          <Image
            key={i}
            style={{
              width: 100,
              height: 100,
            }}
            source={{ uri: p.node.image.uri }}
          />
        );
      })}
      </ScrollView>
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