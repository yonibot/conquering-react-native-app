import React from 'react-native';

var {
  ListView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} = React;

class ItemsList extends React.Component{
  renderItem(item) {
    let iconUri = 'https://cdn0.iconfinder.com/data/icons/ikooni-outline-free-basic/128/free-27-32.png'
    return (
        <View>
          <View style={styles.listItem}>
            <Text
              style={[styles.itemText, item.completed && styles.completedItemText]}>
              {item.content}
            </Text>
            <TouchableHighlight
              underlayColor={'#324B66'}>
              <Image
              style={styles.icon}
              source={{uri: iconUri}}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.separator}></View>
        </View>
    );
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  icon: {
    width: 25,
    height: 25,
  },
  itemText: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 5,
    flex: 0.5
  },
  completedItemText: {
    color: '#47729E'
  },
  separator: {
    height: 1,
    backgroundColor: '#47729E'
  },
})

export { ItemsList as default };
