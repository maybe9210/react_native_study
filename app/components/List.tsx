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
import SCHEMA from '../graphql/todosShema';
import { Mutation } from 'react-apollo';

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
interface Item {
  completed : boolean,
  label : string,
  id? : string
}
type ItemCallback = (index : number) => void;

@observer
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

    // console.log(item.label, item.completed);
    // console.log('id : ', item.id);
    return (
      <View key={i} style={itemStyle}>
        <Text> {item.label} </Text>
        <View style={styles.rightSection}>
          <Mutation mutation={SCHEMA.UPDATE_COMPLETE}>
          {(updateComplete, {data}) => (
            <Checkbox
            isChecked={item.completed}
            onToggle={() => {
              console.log("request 'updateComplette' with ", item);
              updateComplete({variables : {
                data : {
                  completed : !item.completed
                },
                where : {
                  id : item.id
                }
              }})
              onToggleItemCompleted(i);

              console.log("updateComplete finish")
              console.log("data : ", data)
            }}
            />
          )}
          </Mutation>
          <Mutation mutation={SCHEMA.REMOVE_TODO}>
          {
            (removeTodos, { data }) => (
            <TouchableOpacity onPress={
                () => {
                  console.log("request 'removeTodos' with ", item);
                  removeTodos({variables : {
                    where : {
                      id : item.id
                    }
                  }})
                  onRemoveItem(i)
                  console.log("removeTodos finish");
                  console.log("data : ", data);
                }
              }>
              <Text style={styles.remove}> &times; </Text>
            </TouchableOpacity>)
          }
          </Mutation>
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
