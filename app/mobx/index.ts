import { ItemStore } from './itemStore';
import { PhotoStore } from './photoStore';

class RootStore{
  itemStore : ItemStore = new ItemStore();
  photoStore : PhotoStore = new PhotoStore();

  constuctor(){

  }  
}

export {
  ItemStore,
  RootStore,
  PhotoStore
}