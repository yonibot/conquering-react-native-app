/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import TodoList from './containers/TodoList';
import Login from './containers/Login';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage,
} = React;

class AsyncStorageTest extends React.Component{
  renderScene(route, navigator) {
    var Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  }

  render() {
    return (
        <Navigator
          style={styles.container}
          initialRoute={{component: TodoList, index: 0}}
          renderScene={this.renderScene}
          />
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('AsyncStorageTest', () => AsyncStorageTest);
