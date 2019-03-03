import React from 'react';
import {Button,Text,View, StyleSheet, CameraRoll, ScrollView, Image, TouchableOpacity} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { RNCamera } from 'react-native-camera';

interface Props {
  navigation: NavigationScreenProp<any,any>
}

interface State {
  photos : any,
  lastCursor : string
}

export default class ModalScreen extends React.Component<Props, State> {
  static navigationOptions = {header:null};
  constructor(props: Props) {
    super(props);

    this.state = {
      photos : null,
      lastCursor : ''
    }
  }
  camera : RNCamera | null = null;
  pivot : string = '';
  
  _getCapture = () => {
    const options:any = {
      first: 5,
      assetType: 'Photos'
    }
    if (this.state.lastCursor){
      options.after = this.state.lastCursor
    }
    
    CameraRoll.getPhotos(options)
    .then(r => {
      this.setState({ photos: r.edges });
      console.log('end_cursor : ',r.page_info.end_cursor);
      console.log(`Get captures ${this.state.photos}`);
      if(this.state.lastCursor === ''){
        this.setState({
          lastCursor : r.page_info.end_cursor,
          ...this.state
        })
        console.log('set_endcursor : ',this.state.lastCursor);
      }
    })
    .catch((err) => {
      console.error(err);
        //Error Loading Images
    });
  };

  renderPhotos(){
    if(this.state.photos !== null) {
      return (
      <ScrollView style={styles.bottomContainer}
        horizontal={true}
      >
        {this.state.photos.map((p:any,i:number)=> <Image key={i}
          style={{
            width: 80,
            height: 80,
          }}
          source={{ uri: p.node.image.uri }}
        />)
        }
      </ScrollView>)
    } else {
      return (<View><Text>Empty Capture</Text></View>)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          captureAudio={false}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          {this.renderPhotos()}
        </View>
      </View>
    );
  }

  takePicture = async function(this : any) {
    const camera = this.camera;

    if (camera) {
      const options = { 
        quality: 0.5, 
        base64: true,
        forceUpOrientation : true
      };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);

      CameraRoll.saveToCameraRoll(data.uri,"photo")
        .then(result=>{
          
          console.log(result);
          
          this._getCapture();
          // console.log(camera.capture());
        })
        .catch(reason => {
          console.error(reason);
        })
    }
  };
}

const styles = StyleSheet.create({
  // container : { flex: 1, alignItems: 'center', justifyContent: 'center' },
  // text : { fontSize: 30 }
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  preview: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});