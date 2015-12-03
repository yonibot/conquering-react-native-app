import React from 'react-native';
import ApiKeys from '../ApiKeys';
import Login from './Login';
import ApiUtils from '../utils/ApiUtils';

var {
  Text,
  View,
  AsyncStorage,
  ListView,
  StyleSheet,
} = React;

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
    if (this.props.userToken) {
      this.attemptToFetchItems(this.props.userToken);
    } else {
      AsyncStorage.getItem("TodoList:UserToken")
      .then(token => {
        if (token) {
          this.attemptToFetchItems(token)
        } else {
          this.redirectToLogin()
        }
      })
    }
  }

  attemptToFetchItems(token) {
      this.fetchApi(token)
      .then(r => {
        if (r instanceof Error) {
          AsyncStorage.removeItem("TodoList:UserToken")
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

  fetchApi(token) {
    return fetch(ApiKeys.itemsUrl, {
      method: 'GET',
      headers: {
        'AUTH-TOKEN': token
      }
    })
    .then(ApiUtils.checkStatus)
    .then(r => r.json())
    .catch(e => e)
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

export { TodoList as default };
