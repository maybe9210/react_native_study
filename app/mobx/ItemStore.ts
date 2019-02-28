import { observable, action } from 'mobx';
import { ApolloLink, execute } from 'apollo-link';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import SCHEMA from '../graphql/todosShema';

interface Item {
  completed : boolean,
  label : string
}

const httpLink = new HttpLink({
  uri : 'https://api-apeast.graphcms.com/v1/cjshaau0241lj01ckeov1u72p/master',
  headers : {
    authorization : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNmMyY2I2OWMtNTVmNi00YmViLTkxYzktNTM2YzNiODlhMzQxIn0._zvbPaJoPnivqMEQI5vr4cdylOBODtRoH_G3M7ADp3M`
  }
});
const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError}) =>{
  if (graphQLErrors){

  }

  if (networkError){

  }
});
const link = ApolloLink.from([errorLink, httpLink]);

const operation = {
  query : SCHEMA.GET_TODOSES,
  operationName : "get_todos"
}

class ItemStore {
  items = observable<Item>([]);

  isLoading : boolean = false;

  constructor( /*todoses : Item[]*/) { 
    // this.items.replace(todoses);
    execute(link, operation).subscribe({
      next: data => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: error => console.log(`received error ${error}`),
      complete: () => console.log(`complete`),
    })
  }
  
  @action
  setTodos(todos : Item[]){
    this.items.replace(todos);
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