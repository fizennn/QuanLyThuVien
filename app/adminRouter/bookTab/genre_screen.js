import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTheLoai } from '@/redux/actions/theLoaiActions';
import GenreList from '@/components/GenreList';

const GenreScreen = () => {
  const dispatch = useDispatch();
  const { theLoai } = useSelector(state => state.theLoai);

  useEffect(() => {
    dispatch(fetchAllTheLoai());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <GenreList genres={theLoai} />
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
