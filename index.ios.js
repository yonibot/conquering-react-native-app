/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import TodoList from './containers/TodoList';
import Login from './containers/Login';
import NavBar from './components/NavBar';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage,
} = React;

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return (<Text>First page left</Text>);
    }
    var prevRoute = navState.routeStack[index-1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.narBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>{prevRoute.title}</Text>
      </TouchableOpacity>
    )
  },
  Title: function(route, navigator, index, navState) {
    debugger;
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>TodoList - {route.title}</Text>
    )
  },
  RightButton: function(route, navigator, index, navState) {
    return (
      <Text>Right Button</Text>
    )
  },
}

class AsyncStorageTest extends React.Component{
  renderScene(route, navigator) {
    var Component = route.component;
    console.log(route)
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{component: TodoList, index: 0, title: "List Page"}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        }
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    backgroundColor: 'green',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarButtonText: {
    color: 'blue',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'blue',
    fontWeight: '500',
    marginVertical: 9,
  },
});

AppRegistry.registerComponent('AsyncStorageTest', () => AsyncStorageTest);
