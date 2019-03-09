import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    padding: 5,
  },
  disabledHeader: {
    backgroundColor: 'grey',
    padding: 5,
  },
  title: {
    textAlign: 'center',
    color: 'white'
  },
})

export default class Title extends Component<{
  goto? : ()=>any,
  disabled? : boolean | false,
  fontSize? : number | 15
}> {

  render() {
    const {children, goto, disabled, fontSize} = this.props

    return (
      <TouchableOpacity onPress={goto}
        disabled={disabled}
      >
        <View style={disabled === true? styles.disabledHeader : styles.header}>
          <Text style={[styles.title, {fontSize}] }>{children}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
