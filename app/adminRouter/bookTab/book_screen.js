import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addBook } from '@/redux/actions/bookActions';
import { fetchAllTheLoai } from '@/redux/actions/theLoaiActions';
import BookList from '@/components/BookList';
import FloatingAddButton from '@/components/FloatingAddButton';
import AddBookModal from '@/components/AddBookModal';

const BookScreen = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const { theLoai } = useSelector(state => state.theLoai);
  const { token } = useSelector((state) => state.auth);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks({ token }));
    dispatch(fetchAllTheLoai({ token }));
  }, []);

  const handleAddBook = (bookData) => {
    dispatch(addBook({ bookData, token }));
  };

  return (
    <View style={styles.container}>
      {books?.length > 0 ? (
        <BookList books={books} theLoais={theLoai} />
      ) : (
        <Text>Không có sách nào</Text>
      )}
      <FloatingAddButton onPress={() => setModalVisible(true)} />
      <AddBookModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddBook}
        theLoai={theLoai}
      />
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
