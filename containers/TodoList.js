import React from 'react-native';
import ApiKeys from '../ApiKeys';
import Login from './Login';
import LogoutFooter from '../components/LogoutFooter'
import ApiUtils from '../utils/ApiUtils';
import Api from '../utils/Api'
import Colours from '../utils/Colours'
import TodoForm from '../components/TodoForm'
import ItemsList from '../components/ItemsList'

var {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ListView,
  ToastAndroid,
  Platform,
} = React;

class TodoList extends React.Component{
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("TodoList:UserToken")
    .then(token => {
      if (token) {
        this.attemptToFetchItems(token)
      } else {
        this.redirectToLogin()
      }
    })
  }

  attemptToFetchItems(token) {
      Api.getItems(token)
      .then(r => {
        if (r instanceof Error) {
          AsyncStorage.removeItem("TodoList:UserToken");
          this.redirectToLogin();
        } else {
          this.setState({
            token: token,
            dataSource: this.state.dataSource.cloneWithRows(r.items)
          })
        }
      })
  }

  redirectToLogin() {
    if (Platform.OS === 'android') {
      ToastAndroid.show("User logged out.", ToastAndroid.SHORT);
    }
    this.props.replaceRoute({
      name: "Sign in",
      component: Login
    });
  }

  addTodo() {
    let { token, todo } = this.state;
    Api.addItem(token, todo)
      .then(this.attemptToFetchItems.bind(this, token))
    this.setState({todo: ''})
  }

  toggleCompleted(todo) {
    let { token } = this.state;
    Api.toggleCompleted(token, todo.id, !todo.completed)
      .then(this.attemptToFetchItems.bind(this, token));
  }

  deleteItem(todo) {
    let { token } = this.state;
    Api.deleteItem(token, todo.id)
      .then(this.attemptToFetchItems.bind(this, token));
  }

  logout() {
    AsyncStorage.removeItem("TodoList:UserToken")
    .then(this.redirectToLogin.bind(this))
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
        <LogoutFooter logout={this.logout.bind(this)} />
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
