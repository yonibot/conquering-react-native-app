/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import TodoList from './containers/TodoList';
import Login from './containers/Login';
import Router from 'gb-native-router';
import Colours from './utils/Colours'

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} = React;

class AsyncStorageTest extends React.Component{
  render() {
    var firstRoute = {
      component: TodoList,
      name: 'TodoList'
    }
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.navBar} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: Colours.cokeFizz,
  }
});

AppRegistry.registerComponent('AsyncStorageTest', () => AsyncStorageTest);
