'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CameraRoll, Button, ScrollView, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export class Camera extends Component<{},{base64 : string, uri:string}>{
  constructor(props : any){
    super(props);
    this.state = {
      base64 : '',
      uri:''
    }
  }
  render() {
    return (
      <View>
        <RNCamera 
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          captureAudio={false}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
              if (status !== 'READY') return <PendingView />;
              return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                  </TouchableOpacity>
                  <Image source={{uri : this.state.uri}}/>
                </View>
              );
            }}
        </RNCamera>
      </View>
    )
  }

  async takePicture(camera : RNCamera) {
    const options = {qualtiy : 0.5, base64 : true};
    const data = await camera.takePictureAsync(options);

    // this.setState({uri : data.base64, base64 : data.base64})
    console.log(JSON.stringify(data));
    CameraRoll.saveToCameraRoll(data.uri)
    .then((result)=>{
      console.log(result);
    })
    .catch(err => {
      console.error(err)
      throw(err);
    });
  }
}

export class Photolist extends Component<{},{photos: any}>{
  constructor(props: any){
    super(props);
    this.state = {
      photos : []
    };
  }

  _handleButtonPress() {
    CameraRoll.getPhotos({first: 20, assetType: 'Photos'})
      .then(r => {
        this.setState({photos: r.edges});
      })
      .catch((err)=>{
        
      })
  }
  render() {
    return (
      <View>
        <Button title = "Load Image" onPress={this._handleButtonPress}/>
        <ScrollView>
          {this.state.photos.map((p : any,i : number) => {
            return (
              <Image key={i} 
                style={{width : 300, height : 300}}
                source={{uri : p.node.image.uri}}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 1,
    backgroundColor: '#f0f',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});