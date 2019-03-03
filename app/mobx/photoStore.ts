import {observable, action, computed} from 'mobx';
import { CameraRollEdgeInfo } from 'react-native';

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
  selections = observable<boolean>([]);
  @observable lastCursor:string = '';

  @action
  setPhotos(photos : EdgeInfo[]) {
    if(photos.length == 0) {
      return;
    }
    this.photos.replace(photos);
    this.selections = observable(new Array(photos.length));
  }

  @action
  setLastCursor(lastCursor : string){
    this.lastCursor = lastCursor;
  }

  @action
  toggleSelection(index : number) {
    this.selections[index] = !this.selections[index];
    console.log(this.selections);
  }

  @computed
  get selectedCount() : number{
    const selected = this.selections.filter((value, i) => value === true);
    return selected.length;
  }
  getSelectedPhotos() : EdgeInfo[]{

    return this.photos;
  }
}