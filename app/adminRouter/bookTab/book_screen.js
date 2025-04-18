import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '@/redux/actions/bookActions';
import BookList from '@/components/BookList';

const BookScreen = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks({ token }));
  }, []);

  return (
    <View style={styles.container}>
      {books && books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <Text>Không có sách nào</Text>
      )}
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
  },
});
