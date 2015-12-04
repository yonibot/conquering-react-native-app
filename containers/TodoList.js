import React from 'react-native';
import ApiKeys from '../ApiKeys';
import Login from './Login';
import ApiUtils from '../utils/ApiUtils';
import Api from '../utils/Api'

var {
  Text,
  View,
  AsyncStorage,
  ListView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
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
    .then(this.attemptToFetchItems.bind(this, token))
  }

  renderItem(item) {
    return (
        <View>
          <Text
            style={[styles.item, item.completed && styles.completedItem]}
            onPress={this.toggleCompleted.bind(this, item)}>
            {item.content}
          </Text>
          <View style={styles.separator}></View>
        </View>
    );
  }

  logout() {
    AsyncStorage.removeItem("TodoList:UserToken")
    .then(this.redirectToLogin.bind(this))
  }

  render() {
    return (
      <View style={styles.todoListPage}>
        <View style={styles.addTodoForm}>
          <TextInput
            style={styles.inputItem}
            onChangeText={(todo) => this.setState({todo})}
            value={this.state.todo}>
          </TextInput>
          <TouchableHighlight
            style={styles.button}
            onPress={this.addTodo.bind(this)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
        <ListView
          style={styles.listStyle}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
          />
        <TouchableHighlight
          onPress={this.logout.bind(this)}
          style={styles.logoutFooter}
          underlayColor={'grey'}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  todoListPage: {
    flex: 1,
  },
  addTodoForm: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    backgroundColor: '#47729E'
  },
  inputItem: {
    flex: 1,
    fontSize: 23,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: '#324B66',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  listStyle: {
    backgroundColor: '#324B66',
    flex: 1
  },
  item: {
    fontSize: 20,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 6,
    paddingLeft: 5
  },
  completedItem: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'black'
  },
  separator: {
    height: 1,
    backgroundColor: '#47729E'
  },
  logoutFooter: {
    flex: 0.05,
    backgroundColor: '#879743',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: 'white'
  }
});

export { TodoList as default };
