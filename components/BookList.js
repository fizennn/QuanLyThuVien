import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books, theLoais }) => {

  const renderItem = ({ item }) => <BookItem book={item} theLoai={
    theLoais?.find((theLoai) => theLoai._id == item.theLoai)?.tenTheLoai || "Không xác định"
  }/>;

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
