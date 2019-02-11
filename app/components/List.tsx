import React, { Component, /*PropTypes*/ } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Checkbox from './Checkbox'

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
  },
})
interface Item {
  completed : boolean,
  label : string
}
type ItemCallback = (index : number) => void;

export default class List extends Component <{
  onToggleItemCompleted : ItemCallback, onRemoveItem : ItemCallback, items: Item[]}>{
  // static propTypes = {

  //   items: PropTypes.array.isRequired,
  //   onRemoveItem: PropTypes.func.isRequired,
  //   onToggleItemCompleted: PropTypes.func.isRequired,
  // }

  renderItem = (item : Item, i : number) => {
    const {onToggleItemCompleted, onRemoveItem} = this.props
    const itemStyle = item.completed ? [styles.item, styles.completed] : styles.item

    return (
      <View key={i} style={itemStyle}>
        <Text> {item.label} </Text>
        <View style={styles.rightSection}>
          <Checkbox
            isChecked={item.completed}
            onToggle={() => onToggleItemCompleted(i)}
          />
          <TouchableOpacity onPress={() => onRemoveItem(i)}>
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
