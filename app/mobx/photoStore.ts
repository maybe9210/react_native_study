import {observable, action, computed} from 'mobx';
import { createPatient } from '../graphql/schemaTodos';
import { ImageStore, SegmentedControlIOSBase } from 'react-native';
import { TakePictureResponse } from 'react-native-camera/types';

export interface EdgeInfo {
  node: {
      type: string;
      group_name: string;
      image: {
          uri: string;
          height: number;
          width: number;
          playableDuration: number;
          isStored?: boolean;
      };
      timestamp: number;
      location: {
          latitude: number;
          longitude: number;
          altitude: number;
          heading: number;
          speed: number;
      };
  };
}
export class PhotoStore {
  photos = observable<EdgeInfo>([]);
  // selections = observable<boolean>([]);
  // selectedPhotos = observable<EdgeInfo>([]);
  cache = observable<{
    photo : TakePictureResponse,
    selected : boolean}>([]);

  @action
  addPhotoInCache(photo : TakePictureResponse){
    this.cache.unshift({photo, selected : false});
  }
  
  // @action
  // setPhotos(photos : EdgeInfo[]) {
  //   if(photos.length == 0) {
  //     return;
  //   }
  //   this.photos.replace(photos);
  //   this.selections = observable(new Array(photos.length));
  // }

  // @action
  // setLastCursor(lastCursor : string){
  //   this.lastCursor = lastCursor;
  // }

  @action
  toggleSelection(index : number) {
    this.cache[index].selected = !this.cache[index].selected;
    // console.log(this.cache);
  }

  // @action
  // setSelectedPhotos(){
  //   this.selectedPhotos.clear();
  //   this.selections.map((selected,i)=>{
  //     if(selected){
  //       this.selectedPhotos.push(this.photos[i])
  //     }
  //   })

  //   this.selectedPhotos.map((p,i) => {
  //     console.log(p.node.image);
  //   })  
  //   console.log(this.selectedPhotos);
  // }

  @action addPatient(name : string){
    // uploadImage(first.filename, data)

    // const first = this.selectedPhotos[0].node.image;
    // ImageStore.getBase64ForTag(first.uri, (data)=>{
    //   console.log('call uploadImage');
      
    // },(err)=>{
    //   console.log(err);
    // })
    // const data = this.selectedPhotos.map((p,i)=>{
    //   return {
    //     fileName : p.node.image.filename,
    //     height : p.node.image.height,
    //     width : p.node.image.width,
    //     handle : p.node.image.filename,
    //     mimeType : 'image/jpg',
    //     size : 1212327
    //   }
    // });

    // console.log(data);
    // createPatient({
    //   name: name,
    //   checkFirst : false,
    //   checkSecond : false,
    //   picture : {
    //     create : data
    //   }
    // }, {
    //   next : ({data, errors})=> {
    //     console.log(data);
    //     console.log(errors);
    //   },
    //   error: (err)=>{
    //     console.log(err);
    //   }
    // });
  }
}


export function uploadImage(file: string, base64: string){
  const key = 'Akkt6XD8NRri1WmU9XcWCz';
  const projectId = '2b78c7040d7d44d89a443fce8c830b3f';
  const filestackPath = `${projectId}-master`;
  const filename = file;
  const path = `https://www.filestackapi.com/api/store/S3?key=${key}&path=${filestackPath}/${filename}&base64decode=true&mimetype=image/jpeg&filename=${filename}`;

  requestUpload(path, base64);
}

const requestUpload = async (path:string, buffer : string, onsuccess? : any | undefined,) =>{
  try{
    let response = await fetch(path, {
      method : 'POST',
      headers : {
        'Content-Type' : 'image/jpeg; charset=utf-8',
      },
      body : buffer
    })
    console.log(response.status);
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.error(error);
  }
}