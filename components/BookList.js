import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books }) => {
  const renderItem = ({ item }) => <BookItem book={item} />;

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default BookList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
    paddingRight: 16,
  },
});
