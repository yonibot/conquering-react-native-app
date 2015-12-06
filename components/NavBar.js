import React from 'react-native';

var {
  TouchableOpacity,
  Navigator,
  StyleSheet,
} = React;

class NavBar extends React.Component{
  navigationBarRouteMapper() {
    return {
      LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
          return null;
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
        return (
          <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
        )
      }
    }
  }

  render() {
    return (
      <Navigator.NavigationBar
        routeMapper={this.navigationBarRouteMapper}
        style={styles.navBar} />
    )
  }
}

var styles = StyleSheet.create({
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
})

export { NavBar as default };
