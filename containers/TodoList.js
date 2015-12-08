import React from 'react-native';
import ItemsList from '../components/ItemsList'
import Api from '../utils/Api'

var {
  View,
  StyleSheet,
  ListView,
  AsyncStorage
} = React;

class TodoList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount() {
    let token = '20de3d34-5871-4e8a-b700-80af43d6f177';
    // Use our new Api.getItems method!
    Api.getItems(token)
    .then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.items)
      })
    })
  }

  toggleCompleted(todo) {
    debugger;
    // notice the ES6 destructive assignment!
    let { token } = this.state;
    Api.toggleCompleted(token, todo.id, !todo.completed)
  }

  deleteItem(todo) {
    let { token } = this.state;
    Api.deleteItem(token, todo.id)
  }

  render() {
    return (
      <View style={styles.todoListPage}>
        <ItemsList
          dataSource={this.state.dataSource}
          toggleCompleted={this.toggleCompleted.bind(this)}
          deleteItem={this.deleteItem.bind(this)} />
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
