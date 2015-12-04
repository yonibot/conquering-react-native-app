import React from 'react-native';
import Api from '../utils/Api';
import ApiUtils from '../utils/ApiUtils'
import TodoList from './TodoList'

var {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  AsyncStorage
} = React;

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      flash: ''
    }
  }

  registerUser() {
    Api.register(this.state.email, this.state.password)
      .then(ApiUtils.checkStatus)
      .then(r => r.json())
      .then(r => {
        AsyncStorage.setItem("TodoList:UserToken", r.user.token);
        this.props.navigator.push({
          component: TodoList
        })
      })
      .catch(() => {
        this.setState({flash: "Please try again."})
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.flash}>{this.state.flash}</Text>
        <Text style={styles.title}>Create a New Account</Text>
        <TextInput
          style={styles.inputItem}
          placeholder={'joe@example.com'}
          onChangeText={(email) => this.setState({email})}
          />
        <TextInput
          style={styles.inputItem}
          placeholder={'donkeybrains'}
          onChangeText={(pass) => this.setState({password: pass})}
          secureTextEntry={true}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.registerUser.bind(this)}
            underlayColor="white">
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableHighlight>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#324B66'
  },
  flash: {
    marginBottom: 40,
    fontSize: 25,
    textAlign: 'center',
    color: '#879743'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    marginBottom: 50
  },
  registerText: {
    color: '#879743',
    textDecorationLine: 'underline'
  },
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
});

export { Register as default };
