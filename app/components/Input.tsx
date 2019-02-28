import React, { Component, /*PropTypes*/ } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { observable } from 'mobx';
import { observer } from 'mobx-react';

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

  onSubmitEditing = () => {
    const {onSubmit} = this.props
    const {inputText} = this.state

    
    if (!inputText) return
    onSubmit(inputText)
    this.setState({inputText: ''})
  }

  render() {
    const { placeholder } = this.props
    const { inputText } = this.state

    return (
      <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={inputText}
      onChangeText={this.onChangeText}
      onSubmitEditing={this.onSubmitEditing}
      blurOnSubmit={false}
      />
    )
  }
}
