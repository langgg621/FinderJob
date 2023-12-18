import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MultipleSelection = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const data = ['Java', 'Flutter', 'PHP', 'Oracle', '.NET', 'React Native', 'ReactJS', 'iOS', 'Mobile'];

  const handleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.item, selectedItems.includes(item) && styles.selectedItem]}
          onPress={() => handleSelection(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    margin: 5,
    // borderColor: '#ccc',
    backgroundColor: 'F3F0F0',

  },
  selectedItem: {
    // backgroundColor: 'lightblue',
    backgroundColor: 'A39E9E',

  },
});

export default MultipleSelection;
