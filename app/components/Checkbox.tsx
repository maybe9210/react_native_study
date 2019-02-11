import React from 'react'
import { Component, /*PropTypes*/ } from 'react'
import { View, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native'

const styles = StyleSheet.create({
  box: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
})
type Callback = (event : GestureResponderEvent) => void;

export default class Checkbox extends Component<{onToggle : Callback, isChecked : boolean}> {

  // static propTypes = {
  //   onToggle: PropTypes.func,
  //   isChecked: PropTypes.bool,
  // }

  render() {
    const {onToggle , isChecked } = this.props;

    return (
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.box}>
          { isChecked && <View style={styles.inner}/> }
        </View>
      </TouchableOpacity>
    )
  }
}
