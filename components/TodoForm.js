import React from 'react-native';

var {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
} = React;

class TodoForm extends React.Component{
  render() {
    const { onUpdate, todo, addTodo } = this.props;
    return (
      <View style={styles.addTodoForm}>
        <TextInput
          style={styles.inputItem}
          onChangeText={onUpdate}
          value={todo}>
        </TextInput>
        <TouchableHighlight
          style={styles.button}
          onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

TodoForm.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  todo: React.PropTypes.string
}

var styles = StyleSheet.create({
  addTodoForm: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    backgroundColor: '#47729E'
  },
  inputItem: {
    flex: 1,
    fontSize: 23,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: '#324B66',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
});


export { TodoForm as default };
