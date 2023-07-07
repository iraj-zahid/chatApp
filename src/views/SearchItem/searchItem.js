import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SearchItem = ({ title, price, imageUrl }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
      <View style={styles.details}>
        <Text style={styles.title}>daraz</Text>
        <Text style={styles.price}>PKR 780</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.ratingStar}>★</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#f1c40f',
    marginRight: 5,
    fontWeight: 'bold',
  },
  ratingStar: {
    fontSize: 16,
    color: '#f1c40f',
  },
});

export default SearchItem;
