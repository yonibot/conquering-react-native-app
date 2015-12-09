/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import TodoList from './containers/TodoList';
import Router from 'gb-native-router';
import Colours from './utils/Colours'

var {
  AppRegistry,
} = React;

class AsyncStorageTest extends React.Component{
  render() {
    let firstRoute = {
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
  navBar: {
    backgroundColor: Colours.cokeFizz,
  }
});


AppRegistry.registerComponent('AsyncStorageTest', () => AsyncStorageTest);
