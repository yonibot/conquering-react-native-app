import React from 'react-native';
import Api from '../utils/Api';
import ApiUtils from '../utils/ApiUtils'
import TodoList from './TodoList'
import AuthForm from '../components/AuthForm'

var {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  AsyncStorage,
  ToastAndroid,
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
        this.props.toRoute({
          name: "TodoList",
          component: TodoList
        });
        ToastAndroid.show("Login Successful.", ToastAndroid.SHORT);
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
        <AuthForm
          onChangeEmail={(email) => this.setState({email})}
          onChangePassword={(pass) => this.setState({password: pass})}
          onSubmit={this.registerUser.bind(this)}
        />
      </View>
    )
  }
}


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
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
});

export { Register as default };
