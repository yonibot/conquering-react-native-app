import React from 'react-native';
import Api from '../utils/Api';
import ApiUtils from '../utils/ApiUtils'
import TodoList from './TodoList'
import Register from './Register'
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

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      flash: ''
    }
  }

  loginUser() {
    Api.login(this.state.email, this.state.password)
      .then(ApiUtils.checkStatus)
      .then(r => r.json())
      .then(r => {
        AsyncStorage.setItem("TodoList:UserToken", r.user.token);
        this.props.toRoute({
          name: "TodoList",
          component: TodoList,
        });
        ToastAndroid.show("Login successful.", ToastAndroid.SHORT);
      })
      .catch(() => {
        this.setState({flash: "Please check your credentials."})
      });
  }

  register() {
    this.props.toRoute({
      name: "Register",
      component: Register
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.flash}>{this.state.flash}</Text>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.titleTwo}>or <Text style={styles.registerText} onPress={this.register.bind(this)}>register</Text></Text>
        <AuthForm
          onChangeEmail={(email) => this.setState({email})}
          onChangePassword={(pass) => this.setState({password: pass})}
          onSubmit={this.loginUser.bind(this)}
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
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#879743'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  titleTwo: {
    marginBottom: 40,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  registerText: {
    color: '#879743',
    textDecorationLine: 'underline'
  },
});

export { Login as default };
