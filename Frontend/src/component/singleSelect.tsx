import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SingleSelectionExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const data = ['Đang tuyển', 'Đã tuyển đủ'];

  const handleSelection = (item) => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.item, selectedItem === item && styles.selectedItem]}
          onPress={() => handleSelection(item)}
        >
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
    borderWidth: 1,
    backgroundColor: 'F3F0F0',
  },
  selectedItem: {
    backgroundColor: 'A39E9E',
  },
});

export default SingleSelectionExample;
