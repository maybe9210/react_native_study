import { observable, action } from 'mobx';
import { getTodos, createTodo, updateCompleted, removeTodo, removeManyTodos } from '../graphql/schemaTodos';
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
    this.items.replace(todos.reverse());
  }
  @action
  addTodo(input : string) : void {
    createTodo({label : input, completed : false}, {
      next : ({data}) => {
        console.log(JSON.stringify(data));
        this.items.unshift(data.createTodos);
      },
      error : (err) => {
        console.log(err);
      }
    });
  };

  @action
  removeItem(index : number) : void{
    const {id} = this.items[index];
    removeTodo({id},{
      next : ({data, errors}) => {
        if(errors) {
          console.error(errors);
        }
        console.log(JSON.stringify(data));

        const {id} = data.deleteTodos;
        const result = this.items.filter((item, index) => item.id !== id);
        this.items.replace(result);
        
      }, error : (err) => {
        console.error(err);
      }
    })
    // const result :any= this.items.filter((item, i) => i !== index)
    // this.items.replace(result);
    // extendObservable(this.items, result); 
  };

  @action
  toggleCompleted(index : number) : void { 
    const {completed, id} = this.items[index];
    updateCompleted({completed : !completed, id},{
      next : ({data, errors}) => {
        if(errors) {
          console.error(errors);
        }
        console.log(JSON.stringify(data));
        const {completed} = data.updateTodos;
        this.items[index].completed = completed;
      },
      error : (err) => {
        console.log(err);
      }
    })
  };

  removeCompleted() : void {
    const completed = this.items.filter((item,i) => item.completed === true);
    if(completed.length === 0){
      return;
    }
    
    removeManyTodos({completed_not : false}, {
      next : ({data, errors, loading}) => {
        if(errors) {
          console.error(errors);
        }
        if(loading){
          console.log("Now loading");
        }
        
        console.log(JSON.stringify(data));
        this.getAllTodos();
      }
    })
  }
}