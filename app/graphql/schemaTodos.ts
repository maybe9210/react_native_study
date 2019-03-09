import { gql } from 'apollo-boost';
import { ApolloLink, execute, GraphQLRequest } from 'apollo-link';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { onError } from 'apollo-link-error';

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
      id
      label
      completed
    }
  }
`;

const DELETE_MANY_TODOS = gql`
  mutation DeleteManyTodos($where : TodosWhereInput) {
    deleteManyTodoses(where : $where){
      count
    }
  }
`;

const CREATE_PATIENT = gql`
  mutation CreatePatient($data : PatientCreateInput!){
    createPatient(data : $data){
      id
      name
      checkFirst
      checkSecond
      picture {
        id
        url
      }
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

type operation = {
  query : GraphQLRequest,
  variables? : any
};

type response = {
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

export function createTodo(chunk: {label : string, completed? : boolean | false}, res:response) {  
  console.log(chunk);
  const operation = {
    query : CREATE_TODO,
    variables : {
      data : chunk
    }
  }
  return makeSchema(operation, res);  
}

export function updateCompleted(chunk:{completed : boolean, id: string}, res : response) {
  console.log(chunk);
  const operation = {
    query : UPDATE_COMPLETE,
    variables : {
      data : {
        completed : chunk.completed
      },
      where : {
        id : chunk.id
      }
    }
  }
  return makeSchema(operation, res);
}

export function removeTodo(chunk : {id : string}, res : response) {
  console.log(chunk);
  const operation = {
    query : REMOVE_TODO,
    variables : {
      where : {
        id : chunk.id
      }
    }
  }
  return makeSchema(operation, res);
}

export function removeManyTodos(chunk : any, res : response) {
  console.log(chunk);
  const operation = {
    query : DELETE_MANY_TODOS,
    variables : {
      where : chunk
    }
  }
  return makeSchema(operation, res);
}

export interface ImageType {
  fileName : string,
  handle : string,
  size : number,
  mimeType : string
}
interface CreatePatientType {
  name : string,
  checkFirst : boolean | false,
  checkSecond : boolean | false,
  picture : {
    create : ImageType[]
  }
}
export function createPatient(chunk : CreatePatientType, res : response){
  console.log(chunk);
  const operation = {
    query: CREATE_PATIENT,
    variables : {
      data : chunk
    }
  }
  return makeSchema(operation, res);
}
