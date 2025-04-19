import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTheLoai, addTheLoai } from '@/redux/actions/theLoaiActions';
import GenreList from '@/components/GenreList';
import FloatingAddButton from '@/components/FloatingAddButton';
import AddGenreModal from '@/components/AddGenreModal';

const GenreScreen = () => {
  const dispatch = useDispatch();
  const { theLoai } = useSelector(state => state.theLoai);
  const { token } = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTheLoai({ token }));
  }, [dispatch, token]);

  const handleAddGenre = (genreData) => {
    dispatch(addTheLoai({ genreData, token }));
  };

  return (
    <View style={styles.container}>
      <GenreList genres={theLoai} />
      <FloatingAddButton onPress={() => setModalVisible(true)} />
      <AddGenreModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddGenre}
      />
    </View>
  );
};

export default GenreScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
