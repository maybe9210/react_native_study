import React from 'react';
import {Button,Text,View, StyleSheet, CameraRoll, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import { inject, observer } from 'mobx-react';
import { RootStore, PhotoStore } from '../mobx';
import Checkbox from '../components/Checkbox';

interface Props {
  navigation: NavigationScreenProp<any,any>,
  store? : RootStore
}

@inject("store")
@observer
export default class ModalScreen extends React.Component<Props> {
  static navigationOptions = {header:null};
  constructor(props: Props) {
    super(props);
  }
  camera : RNCamera | null = null;
  pivot : string = '';
  
  _getCapture = () => {
    const options:any = {
      first: 10,
      assetType: 'Photos'
    }
    const rootStore = this.props.store as RootStore;
    const store = rootStore.photoStore as PhotoStore;
    
    CameraRoll.getPhotos(options)
    .then(r => {
      store.setPhotos(r.edges);
      console.log('end_cursor : ',r.page_info.end_cursor);
      console.log(`Get captures ${store.photos}`);
      if(store.lastCursor === ''){
        store.setLastCursor(r.page_info.end_cursor || '');
        console.log('set_endcursor : ',store.lastCursor);
      }
    })
    .catch((err) => {
      console.error(err);
        //Error Loading Images
    });
  };

  renderPhotos(){
    const rootStore = this.props.store as RootStore;
    const store = rootStore.photoStore as PhotoStore;
    const toggleStyles = StyleSheet.create({
      box: {
        height: 80,
        width: 80,
        borderWidth: 4,
        borderColor: 'skyblue',
      },
      inner: {
        flex: 1,
        margin: 5,
        backgroundColor: '#b0e0e6aa',
      },
    })
    if(store.photos !== null) {
      return (
      <ScrollView style={styles.bottomContainer}
        horizontal={true}
      >
        {store.photos.map((p:any,i:number)=> 
        <ImageBackground key={i}
          style={styles.square80}
          source={{ uri: p.node.image.uri }}
        >
          <Checkbox isChecked={store.selections[i]}
            styles={toggleStyles}
            onToggle={()=>{store.toggleSelection(i)}}
          />
        </ImageBackground>)}
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

      CameraRoll.saveToCameraRoll(data.uri, "photo")
        .then(result=>{
          console.log(result);
          this._getCapture();
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
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  square80 : {
    height : 80,
    width : 80
  },
  box: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: 'red',
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(255,50,50,0.8)',
  },
});