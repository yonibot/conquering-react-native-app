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

  renderItem(item) {
    return (
      <View>
        <Text style={styles.item}>{item.content}</Text>
        <View style={styles.separator}></View>
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.listStyle}
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        />
    )
  }
}

var styles = StyleSheet.create({
  listStyle: {
    paddingTop: 25,
    backgroundColor: '#324B66'
  },
  item: {
    fontSize: 25,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 6,
    paddingLeft: 5
  },
  separator: {
    height: 1,
    backgroundColor: '#47729E'
  }
});

export { TodoList as default };
