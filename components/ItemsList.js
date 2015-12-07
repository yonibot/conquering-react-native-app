import React from 'react-native';

var {
  ListView,
  Text,
  StyleSheet,
  View,
} = React;

class ItemsList extends React.Component{
  renderItem(item) {
    return (
      <View>
        <Text style={styles.itemText}>{item.content}</Text>
        <View style={styles.separator}></View>
      </View>
    )
  }

  render() {
    return (
      <ListView
        style={styles.listStyle}
        dataSource={this.props.dataSource}
        renderRow={this.renderItem}
        />
    )
  }
}

var styles = StyleSheet.create({
  listStyle: {
    backgroundColor: '#324B66',
    flex: 1
  },
  itemText: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 5
  },
  separator: {
    height: 1,
    backgroundColor: '#47729E'
  },
})

export { ItemsList as default };
