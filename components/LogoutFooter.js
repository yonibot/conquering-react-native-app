import React from 'react-native';
import Colours from '../utils/Colours';

var {
  TouchableHighlight,
  Text,
  StyleSheet
} = React;

class LogoutFooter extends React.Component{
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.logout}
        style={styles.logoutFooter}
        underlayColor={'grey'}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableHighlight>
    )
  }
}

LogoutFooter.propTypes = {
  logout: React.PropTypes.func.isRequired
}

var styles = StyleSheet.create({
  logoutFooter: {
    flex: 0.1,
    backgroundColor: Colours.cokeFizz,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: 'white',
    fontSize: 18
  }
})

export { LogoutFooter as default };
