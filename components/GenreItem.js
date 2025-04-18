import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const GenreItem = ({ genre }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: 'https://img.icons8.com/external-inkubators-glyph-inkubators/100/external-tag-email-inkubators-glyph-inkubators.png' }} style={[styles.image,{tintColor:genre.mau}]} />
      <Text style={styles.genreName}>{genre.tenTheLoai.toString()}</Text>
    </View>
  );
};

export default GenreItem;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffff',
  },
  genreName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'gray',
    marginLeft: 55,
  },
  image: {
    width: 55,
    height: 55,
    position: 'absolute',
    top:-7,
  },
});
