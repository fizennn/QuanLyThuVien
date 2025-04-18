import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '@/redux/actions/bookActions';
import { fetchAllTheLoai } from '@/redux/actions/theLoaiActions';
import BookList from '@/components/BookList';

const BookScreen = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const { theLoai } = useSelector(state => state.theLoai);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks({ token }));
    dispatch(fetchAllTheLoai({ token }));
  }, []);

  return (
    <View style={styles.container}>
      {books && books.length > 0 ? (
        <BookList books={books} theLoais={theLoai}/>
      ) : (
        <Text>Không có sách nào</Text>
      )}
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
  },
});
