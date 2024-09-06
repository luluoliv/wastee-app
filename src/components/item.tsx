import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemData } from './items'; // Adjust the path as needed

interface ItemProps {
  data: ItemData;
}

const Item: React.FC<ItemProps> = ({ data }) => {
  const handleClassificationPress = () => {
    console.log('Classification pressed');
  };

  const handleOptionsPress = () => {
    console.log('Options pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.classificationButton} onPress={handleClassificationPress}>
          <Text style={styles.classificationText}>★</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsButton} onPress={handleOptionsPress}>
          <Text style={styles.optionsText}>⋮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.discountedPrice}>{data.discountedPrice}</Text>
        <Text style={styles.originalPrice}>{data.originalPrice}</Text>
        <Text style={styles.seller}>{data.seller}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  classificationButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  classificationText: {
    color: 'white',
    fontSize: 16,
  },
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  optionsText: {
    color: 'white',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discountedPrice: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'red',
    marginBottom: 5,
  },
  seller: {
    fontSize: 14,
    color: '#555',
  },
});

export default Item;
