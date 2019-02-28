import { gql } from 'apollo-boost';
import { ApolloLink, execute, GraphQLRequest } from 'apollo-link';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { VariableValue } from 'apollo-utilities';
import { Item, ItemCallback } from '../const';

const GET_TODOSES = gql`
  query {
    todoses {
      id
      completed
      label
    }
  }`;

const UPDATE_COMPLETE = gql`
  mutation UpdateComplete($data : TodosUpdateInput!, $where : TodosWhereUniqueInput!){
    updateTodos(data : $data, where : $where) {
      id
      completed
      label
    }
  }`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($where : TodosWhereUniqueInput!) {
    deleteTodos(where : $where) {
      id
      completed
      label
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($data : TodosCreateInput!) {
    createTodos(data : $data) {
      label
      completed
    }
  }
`;

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

interface operation {
  query : GraphQLRequest,
  variable? : any
};

interface response {
  next : (value: any) => void,
  error? : ((error: any) => void | undefined) | undefined,
  complete?: () => void
}
function makeSchema(operation : operation, response : response) {
  return execute(link, operation).subscribe(response);
}

export function getTodos(res : response) {
  const operation = {query : GET_TODOSES};
  return makeSchema(operation, res);
}

export function createTodo(variable: Item, res:response) {
  
  const operation = {
    query : CREATE_TODO,
    variable
  }
  return makeSchema(operation, res);  
}

