import React from 'react-native';
import ItemsList from '../components/ItemsList'
import Api from '../utils/Api'
import TodoForm from '../components/TodoForm'

var {
  View,
  StyleSheet,
  ListView,
} = React;

class TodoList extends React.Component{
  constructor() {
    super();
    this.state = {
      token: '20de3d34-5871-4e8a-b700-80af43d6f177',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount() {
    // Use our new Api.getItems method!
    Api.getItems(this.state.token)
    .then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.items)
      })
    })
  }

  toggleCompleted(todo) {
    // notice the ES6 destructive assignment!
    let { token } = this.state;
    Api.toggleCompleted(token, todo.id, !todo.completed)
  }

  deleteItem(todo) {
    let { token } = this.state;
    Api.deleteItem(token, todo.id)
  }

  addTodo() {
    let { token, todo } = this.state;
    Api.addItem(token, todo)
    this.setState({todo: ''})
  }

  updateTodo(todo) {
    this.setState({todo})
  }

  render() {
    return (
      <View style={styles.todoListPage}>
        <TodoForm
          addTodo={this.addTodo.bind(this)}
          onUpdate={this.updateTodo.bind(this)}
          todo={this.state.todo} />
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
