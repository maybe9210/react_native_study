import React, { Component } from 'react';
import {Button,Text,View, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions, ImageStore, CameraRoll, Keyboard} from 'react-native';
import {Input, Title } from '../components';
import { RootStore, PhotoStore } from '../mobx';
import { NavigationScreenProp } from 'react-navigation';
import { inject, observer } from 'mobx-react';

const { width } = Dimensions.get('window');

interface Props {
  navigation: NavigationScreenProp<any,any>,
  store? : RootStore
}

@inject("store")
@observer
export class RegisterScreen extends Component<Props>{
  static navigationOptions = {
    title: 'Registration',
  };
  constructor(props:Props){
    super(props);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    console.log(`width : ${width} height : ${height}`);
  }
  renderPhotos(){
    const rootStore = this.props.store as RootStore;
    const store = rootStore.photoStore as PhotoStore;
    const selecteds = store.cache.filter(item => item.selected === true);
    // selecteds.map((p) => {
    //   console.log(p);
    // })  
    return (
      <ScrollView horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={width - 60} //your element width
        snapToAlignment={"center"}
        contentInset={{
          top : 0, left : 30, right :30, bottom :0
        }}
        style={{flex:1}}
      >
      {
        selecteds.map((p, i)=>{
          return <Image key={i} style={styles.squareImg}
            source={{uri:p.photo.uri}}
          />
        })
      }
      </ScrollView>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flex:1}}>
          {this.renderPhotos()}
        </View>
        <View style={styles.inputLayer}>
          <View style={{borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.5)'
              }}>
            <Text>환자이름</Text>
            <Input placeholder={'Enter patient name'}
              onSubmit={this._submit.bind(this)}
              autoFocus={true}
              />
          </View>
        </View>
        {this.renderUploadState()}
      </View>
    );
  }

  renderUploadState() {
    const rootStore = this.props.store as RootStore;
    const store = rootStore.photoStore as PhotoStore;

    if(store.uploadState.state === 'upload-first') {
      return (<View><Text>{store.uploadState.state} Total : {store.uploadState.targetCount} Now : {store.uploadState.succedCount}</Text></View>)
    } else if(store.uploadState.state === 'upload-second') {
      return (<View><Text>{store.uploadState.state}</Text></View>)
    } else if(store.uploadState.state === 'error') {
      return (<View><Text>{store.uploadState.state}</Text></View>)
    } else if(store.uploadState.state === 'finish') {
      return (<View><Text>{store.uploadState.state}</Text></View>)
    } else {
      return 
    }
  }
  _submit(input:string) {
    const rootStore = this.props.store as RootStore;
    const store = rootStore.photoStore as PhotoStore;
    const selecteds = store.cache.filter(item => item.selected === true);
    console.log(`환자 이름 : ${input}`);

    Keyboard.dismiss();
    selecteds.map(item => {
      CameraRoll.saveToCameraRoll(item.photo.uri, "photo")
        .then(result=>{
          console.log(result);
        })
        .catch(reason => {
          console.error(reason);
        })
    });
    
    store.addPatient(input, ()=> {
      this.props.navigation.navigate('Home');
    });
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  },
  squareImg : {
    width : width - 80,
    height : width - 80,
    margin : 10
  },
  inputLayer : {
    flex : 1,
    width : width - 80,
    margin : 40
  }
})