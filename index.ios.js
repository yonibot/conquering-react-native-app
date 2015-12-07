/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import TodoList from './containers/TodoList';

var {
  AppRegistry,
} = React;

class AsyncStorageTest extends React.Component{
  render() {
    return (
      <TodoList />
    );
  }
}


AppRegistry.registerComponent('AsyncStorageTest', () => AsyncStorageTest);
