import React from 'react';
import {Button,Text,View, StyleSheet, CameraRoll, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { inject, observer } from 'mobx-react';
import { RootStore, PhotoStore } from '../mobx';
import {Checkbox} from '../components';
import { uploadImage } from '../mobx/photoStore';

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
      // store.setPhotos(r.edges);
      console.log('end_cursor : ',r.page_info.end_cursor);
      console.log(`Get captures ${store.photos}`);
      // if(store.lastCursor === ''){
      //   store.setLastCursor(r.page_info.end_cursor || '');
      //   console.log('set_endcursor : ',store.lastCursor);
      // }
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
        borderWidth: 2,
        borderColor: '#ffffffaa',
      },
      inner: {
        flex: 1,
        margin: 5,
        backgroundColor: '#ffffffaa',
      },
    })
    if(store.cache !== null) {
      return (
      <ScrollView style={styles.bottomContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {store.cache.map((p,i)=> 
        <ImageBackground key={i}
          style={styles.square90}
          source={{ uri: p.photo.uri }}
        >
          <Checkbox isChecked={store.cache[i].selected}
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
    const rootStore = this.props.store as RootStore;
    const store = rootStore.photoStore as PhotoStore;
    const selected = store.cache.filter((item, i) => item.selected === true);

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref:RNCamera) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          captureAudio={false}
        />
        <View style={{flex:1}}>
          {this.renderPhotos()}
        </View>
        <View style={styles.footerButtos}>
          <View style={{width : 100}}>
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Dismiss"
            />
          </View>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture} />
          <View style={{width : 100}}>
            <Button
              disabled={selected.length === 0}
              onPress={() => {
                this.props.navigation.navigate('Registration')}}
              title={`Submit ${selected.length}`}
            />
          </View>
        </View>
        
      </View>
    );
  }

  takePicture = async function(this : any) {
    const camera : RNCamera = this.camera;

    if (camera) {
      const options = { 
        quality: 0.5, 
        base64: true,
        forceUpOrientation : true,
        width: 1024
      };
      const data:TakePictureResponse = await camera.takePictureAsync(options);
      console.log(data.uri);
      
      const rootStore = this.props.store as RootStore;
      const store = rootStore.photoStore as PhotoStore;

      store.addPhotoInCache(data);
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
  footerButtos : {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#ddd',
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  square90 : {
    height : 80,
    width : 80,
    margin : 5
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