import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Modal, Button, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPhieuMuon } from '@/redux/actions/phieuMuonActions';
import { fetchBooks } from '@/redux/actions/bookActions';
import BorrowingItem from '@/components/BorrowingItem';
import FloatingAddButton from '@/components/FloatingAddButton';
import AddBorrowingModal from '@/components/AddBorrowingModal'; // Import modal thêm phiếu mượn
import { Icon } from 'react-native-paper';
import { router } from 'expo-router';

const BorrowingScreens = () => {
  const dispatch = useDispatch();
  const { borrowings, loading, error } = useSelector(state => state.phieuMuon);
  // Giả sử thông tin user được lưu trong state.auth (user chứa thông tin nhân viên)
  const { token, user } = useSelector(state => state.auth);
  const { books } = useSelector(state => state.book);
  const [searchText, setSearchText] = useState('');
  const [filteredBorrowings, setFilteredBorrowings] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks({ token }));
    dispatch(fetchAllPhieuMuon(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredBorrowings(borrowings);
    } else {
      const normalizedSearch = searchText
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      setFilteredBorrowings(
        borrowings.filter(item => {
          const normalizedId = item._id
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          const normalizedCustomer = item.idKhachHang
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          return normalizedId.includes(normalizedSearch) || normalizedCustomer.includes(normalizedSearch);
        })
      );
    }
  }, [searchText, borrowings]);

  const renderItem = ({ item }) => <BorrowingItem borrowing={item} books={books} />;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm phiếu mượn..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => router.push('/registration_screen')}>
        <Image
          source={{uri: 'https://img.icons8.com/ios/100/ticket--v1.png'}}
          style={styles.icon}/>
        </TouchableOpacity>
        
      </View>
      <View style={styles.container}>
        {loading ? (
          <Text>Đang tải...</Text>
        ) : error ? (
          <Text>Lỗi: {error}</Text>
        ) : (
          <FlatList
            data={filteredBorrowings}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            ListEmptyComponent={<Text>Không có phiếu mượn nào</Text>}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Sử dụng FloatingAddButton có sẵn */}
      <FloatingAddButton onPress={() => setShowAddDialog(true)} />

      {/* Modal dialog thêm phiếu mượn, truyền employee và availableBooks */}
      <AddBorrowingModal 
        visible={showAddDialog} 
        onClose={() => setShowAddDialog(false)}
        onSubmit={(newBorrowing) => {
          console.log('New Borrowing:', newBorrowing);
          // Xử lý phiếu mượn mới tại đây
        }}
        employee={user} // truyền thông tin user (nhân viên)
        availableBooks={books} // truyền danh sách sách
      />
    </View>
  );
};

export default BorrowingScreens;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
});