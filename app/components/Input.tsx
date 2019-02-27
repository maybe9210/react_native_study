import React, { Component, /*PropTypes*/ } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Mutation } from 'react-apollo';

import SCHEMA from '../graphql/todosShema';

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 15,
  },
});
type Callback = (event : any) => void;
interface Props {
  onSubmit : Callback, 
  placeholder : string
}
interface State {
  inputText: string
}
@observer
export default class Input extends Component <Props, State>{

  // static propTypes = {
  //   onSubmit: PropTypes.func,
  //   placeholder: PropTypes.string,
  // }
  constructor(props: Props){
    super(props);
    this.state = {
      inputText : ''
    };
  }

  onChangeText = (text : string) => {
    this.setState({inputText: text})
  }

  onSubmitEditing = (inputLabel : string) => {
    const {onSubmit} = this.props
    // const {inputText} = this.state

    
    // if (!inputText) return
    onSubmit(inputLabel)
    this.setState({inputText: ''})
  }

  render() {
    const { onSubmit, placeholder } = this.props
    const { inputText } = this.state

    return (
      <Mutation mutation={SCHEMA.CREATE_TODO}>
      {(createTodo, res) => (    
          <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={inputText}
          onChangeText={this.onChangeText}
          onSubmitEditing={() => {
            if(!inputText){
              return;
            }
            createTodo({variables : {
              data : {
                label : inputText,
                completed : false
              }
            }});
            // onSubmit(inputText);

            console.log("res : ", res);
            this.onSubmitEditing(inputText);
          }}
          blurOnSubmit={false}
          />
      )}
      </Mutation>
    )
  }
}
