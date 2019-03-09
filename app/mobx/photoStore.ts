import {observable, action, computed} from 'mobx';
import { createPatient, ImageType } from '../graphql/schemaTodos';
import { ImageStore, SegmentedControlIOSBase } from 'react-native';
import { TakePictureResponse } from 'react-native-camera/types';

interface UploadState {
  state : 'ready' | 'upload-first' | 'upload-second' | 'error' | 'finish',
  targetCount : number,
  succedCount : number,
  errorCount : number
}
export class PhotoStore {
  cache = observable<{
    photo : TakePictureResponse,
    selected : boolean}>([]);
  @observable uploadState : UploadState = {
    state : 'ready',
    targetCount: 0,
    succedCount : 0,
    errorCount : 0
  }

  @action
  addPhotoInCache(photo : TakePictureResponse){
    this.cache.unshift({photo, selected : false});
  }
  
  @action
  toggleSelection(index : number) {
    this.cache[index].selected = !this.cache[index].selected;
    // console.log(this.cache);
  }

  @action
  increaseCount(){
    this.uploadState.succedCount = this.uploadState.succedCount + 1;
  }

  @action addPatient(name : string, onsuccess :()=>void){
    const selecteds = this.cache.filter(item => item.selected === true);
    this.uploadState.state = 'upload-first'
    this.uploadState.targetCount = selecteds.length;
    let resImg:any[] = [];
    selecteds.map((item, index) => {
      const base64 = item.photo.base64 || '';
      uploadImage(item.photo.uri, base64, 
        (res) => {
          console.log('Success upload to filestack');
          res.json().then((result:any) => {
            console.log('parse json');
            console.log(result);
            resImg.push(result);
            this.increaseCount();
            if (this.uploadState.targetCount === this.uploadState.succedCount ){
              this.uploadState.state = 'upload-second'
              const images :ImageType[] = resImg.map(item => {
                return {
                  fileName : item.filename,
                  handle : item.url.split('/').pop(),
                  size : item.size,
                  mimeType : item.type
                }
              })
              
              createPatient({
                name,
                checkFirst : false,
                checkSecond : false,
                picture : {
                  create : images
                }
              }, {
                next : res =>{
                  this.uploadState.state = 'finish';
                  console.log('Success GraphCMS!!!');
                  console.log(res);
                  onsuccess();
                },
                error : err => {
                  console.log('Error at GraphCMS!!!');
                  console.error(err);
                }
              });
            }
          });
        },
        (err)=>{
          console.log('Error at filestack!!!');
          console.error(err);
        }
      );
    })
  }
}


function uploadImage(file: string, base64: string, onsuccess:(res:any)=>void, onerror:(err:any)=>void){
  const key = 'Akkt6XD8NRri1WmU9XcWCz';
  const projectId = '2b78c7040d7d44d89a443fce8c830b3f';
  const filestackPath = `${projectId}-master`;
  const filename = file.split('/').pop();
  const path = `https://www.filestackapi.com/api/store/S3?key=${key}&path=${filestackPath}/${filename}&base64decode=true&mimetype=image/jpeg&filename=${filename}`;

  // requestUpload(path, base64);
  fetch(path, {
    method : 'POST',
    headers: {
      'Content-Type' : 'image/jpeg; charset=utf-8',
    },
    body : base64
  })
  .then(onsuccess)
  .catch(onerror);

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