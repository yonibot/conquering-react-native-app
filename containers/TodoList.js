import React from 'react-native';
import ApiKeys from '../ApiKeys';
import Login from './Login';
import LogoutFooter from '../components/LogoutFooter'
import ApiUtils from '../utils/ApiUtils';
import Api from '../utils/Api'
import Colours from '../utils/Colours'
import TodoForm from '../components/TodoForm'

var {
  Text,
  View,
  AsyncStorage,
  ListView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
} = React;

class TodoList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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
    this.props.navigator.push({
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

  renderItem(item) {
    return (
        <View>
          <View style={styles.listItem}>
            <Text
              style={[styles.itemText, item.completed && styles.completedItemText]}
              onPress={this.toggleCompleted.bind(this, item)}>
              {item.content}
            </Text>
            <TouchableHighlight
              onPress={this.deleteItem.bind(this, item)}
              underlayColor={'#324B66'}>
              <Image
              style={styles.icon}
              source={{uri: 'https://cdn0.iconfinder.com/data/icons/ikooni-outline-free-basic/128/free-27-32.png'}}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.separator}></View>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.todoListPage}>
        <TodoForm
          addTodo={this.addTodo.bind(this)}
          onUpdate={this.updateTodo.bind(this)}
          todo={this.state.todo} />
        <ListView
          style={styles.listStyle}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
          />
        <LogoutFooter logout={this.logout.bind(this)} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  todoListPage: {
    flex: 1,
  },
  listStyle: {
    backgroundColor: '#324B66',
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  icon: {
    width: 25,
    height: 25,
  },
  itemText: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 5,
    flex: 0.5
  },
  completedItemText: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'black'
  },
  separator: {
    height: 1,
    backgroundColor: '#47729E'
  },
});

export { TodoList as default };
