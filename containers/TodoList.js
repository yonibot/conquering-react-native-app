import React from 'react-native';
import ItemsList from '../components/ItemsList'

var {
  View,
  StyleSheet,
  ListView,
} = React;


class TodoList extends React.Component{

  constructor(props) {
    super(props);
    let dummyTodos = [
      {content: "Learn ES6"},
      {content: "I <3 React Native!"},
      {content: "Build a great app!"}
    ]
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
    flex: 1,
  },
});

export { TodoList as default };
