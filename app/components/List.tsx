import React, { Component, /*PropTypes*/ } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Checkbox from './Checkbox'
import { observer } from 'mobx-react';
import { Item, ItemCallback } from '../const';


@observer
export default class List extends Component <{
  onToggleItemCompleted : ItemCallback, 
  onRemoveItem : ItemCallback,
  navigate : any,
  items: Item[]}>{

  renderItem = (item : Item, i : number) => {
    const {onToggleItemCompleted, onRemoveItem, navigate} = this.props
    const itemStyle = item.completed ? [styles.item, styles.completed] : styles.item

    return (
      <View key={i} style={itemStyle}>
        <TouchableOpacity onPress={()=>{navigate("Details",{title:item.label})}}>
          <Text> {item.label} </Text>
        </TouchableOpacity>
        <View style={styles.rightSection}>
          <Checkbox
          isChecked={item.completed}
          onToggle={() => onToggleItemCompleted(i)}
          />
          <TouchableOpacity onPress={()=>onRemoveItem(i)}>
            <Text style={styles.remove}> &times; </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {items} = this.props

    return (
      <ScrollView style={styles.container}>
        {items.map(this.renderItem)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },
  completed: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  }
})