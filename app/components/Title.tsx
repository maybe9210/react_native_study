import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    padding: 5,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40
  },
})

export default class Title extends Component<{
  goto : ()=>any
}> {

  render() {
    const {children, goto} = this.props

    return (
      <TouchableOpacity onPress={goto}>
        <View style={styles.header}>
          <Text style={styles.title}>{children}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
