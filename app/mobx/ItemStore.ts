import { observable, action } from 'mobx';
import { getTodos } from '../graphql/schemaTodos';
import { Item } from '../const';

export class ItemStore {
  items = observable<Item>([]);

  isLoading : boolean = false;

  constructor( /*todoses : Item[]*/) { 
    // this.items.replace(todoses);  
  }
  
  @action
  getAllTodos() {
    getTodos({next : ({data})=>{
      console.log(`todoses : ${JSON.stringify(data.todoses)}`);
      this.setTodos(data.todoses);
    }})
  }
  @action
  setTodos(todos : Item[]){
    todos.map((item, index) => {
      this.items.push(item);
    })
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