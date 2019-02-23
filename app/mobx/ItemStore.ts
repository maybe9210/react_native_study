import {observable, computed, action, extendObservable} from 'mobx';

interface Item {
  completed : boolean,
  label : string
}

class ItemStore {
  items = observable<Item>([]);

  constructor() { 
    // this.items = observable([]);
  }
  
  @action
  addTodo(input : string) : void {
    
    this.items.unshift({label: input, completed: false});
  };

  @action
  removeItem(index : number) : void{
    const result :any= this.items.filter((item, i) => i !== index)
    this.items.replace(result);
    // extendObservable(this.items, result); 
  };

  @action
  toggleCompleted(index : number) : void { 
    this.items[index].completed = !this.items[index].completed;
  };

  @action
  removeCompleted() : void {
    const result = this.items.filter((item, i) => item.completed === false);
    this.items.replace(result);
    // extendObservable(this.items, result);
  }
}

// const itemStore = new ItemStore();

export default ItemStore;