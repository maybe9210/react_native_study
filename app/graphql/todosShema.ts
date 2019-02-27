import { gql } from 'apollo-boost';

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

export default {
  GET_TODOSES,
  UPDATE_COMPLETE,
  REMOVE_TODO
}
