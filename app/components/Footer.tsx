import React, { Component, /*PropTypes*/ } from 'react'
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native'

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  remove: {
    color: '#CD5C5C',
  },
})
type Callback = (event : GestureResponderEvent) => void;
export default class Footer extends Component<{onRemoveCompleted : Callback}> {

  // static propTypes = {
  //   onRemoveCompleted: PropTypes.func,
  // }

  render() {
    const {onRemoveCompleted} = this.props

    return (
      <TouchableOpacity style={styles.footer} onPress={onRemoveCompleted}>
        <Text style={styles.remove}>Remove completed items</Text>
      </TouchableOpacity>
    )
  }
}
