import React from 'react-native';

var {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  StyleSheet,
} = React;

class AuthForm extends React.Component{
  render() {
    const { onChangeEmail, onChangePassword, onSubmit } = this.props;
    return (
      <View>
        <TextInput
          style={styles.inputItem}
          placeholder={'joe@example.com'}
          onChangeText={onChangeEmail}
          />
        <TextInput
          style={styles.inputItem}
          placeholder={'donkeybrains'}
          onChangeText={onChangePassword}
          secureTextEntry={true}
          />
        <TouchableHighlight
          style={styles.button}
          onPress={onSubmit}
          underlayColor="white">
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

AuthForm.propTypes = {
  onChangeEmail: React.PropTypes.func.isRequired,
  onChangePassword: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
  inputItem: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    marginTop: 10
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#47729E',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})

export { AuthForm as default };
