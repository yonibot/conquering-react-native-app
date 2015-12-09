import React from 'react-native';
import ItemsList from '../components/ItemsList'
import Api from '../utils/Api'
import LogoutFooter from '../components/LogoutFooter'
import Login from './Login';

var {
  View,
  StyleSheet,
  ListView,
  AsyncStorage,
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
    // Step 1 - Check if there is a token
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
    // Step 2 - Attempt to fetch data
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

  toggleCompleted(todo) {
    // notice the ES6 destructive assignment!
    let { token } = this.state;
    Api.toggleCompleted(token, todo.id, !todo.completed)
  }

  deleteItem(todo) {
    let { token } = this.state;
    Api.deleteItem(token, todo.id)
  }

  logout() {
    AsyncStorage.removeItem("TodoList:UserToken")
    .then(this.redirectToLogin.bind(this))
  }

  redirectToLogin() {
    this.props.replaceRoute({
      name: "Sign in",
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.todoListPage}>
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
