import React from 'react-native';
import ItemsList from '../components/ItemsList'

var {
  View,
  StyleSheet,
  ListView,
} = React;

var dummyTodos = [
  {content: "Learn ES6", completed: false},
  {content: "I <3 React Native!", completed: true},
  {content: "Build a great app!", completed: false}
];

class TodoList extends React.Component{

  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows(dummyTodos)
    }
  }

  render() {
    return (
      <View style={styles.todoListPage}>
        <ItemsList dataSource={this.state.dataSource} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  todoListPage: {
    /* Remember! CSS styles in React-Native are in camelCase
   and not hyphenated, like they are usually. */
    flex: 1,
  },
});

export { TodoList as default };
