import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return "#808080"; // xám
    case 1:
      return "#008000"; // xanh lá cây
    case 2:
      return "#FFFF00"; // vàng
    default:
      return "#000000"; // mặc định đen nếu status không xác định
  }
};

const BorrowingItem = ({ borrowing, books }) => {
  const router = useRouter();
  
  const bookNames = borrowing.sachMuon.map(item => {
    const book = books.find(b => b._id === item._id);
    return book ? book.tenSach : item._id;
  });

  const handlePress = () => {
  
    router.push({
      pathname: '/borrowing_detail',
      params: {
        id: borrowing._id,
        customerId: borrowing.idKhachHang,
        staffId: borrowing.idNhanVien,
        borrowDate: borrowing.ngayMuon,
        dueDate: borrowing.hanTra,
        bookIds: JSON.stringify(borrowing.sachMuon),
        status: borrowing.trangThai.toString(),
        bookNames: JSON.stringify(bookNames)
      }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>Mã phiếu: {borrowing._id}</Text>
            <Text>Khách hàng: {borrowing.idKhachHang}</Text>
            <Text>Nhân viên: {borrowing.idNhanVien}</Text>
            <Text>
              Ngày mượn: {new Date(borrowing.ngayMuon).toLocaleDateString()}
            </Text>
            <Text>
              Hạn trả: {(borrowing.hanTra)}
            </Text>
            <Text>Sách mượn: {bookNames.join(', ')}</Text>
          </View>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor(borrowing.trangThai) }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BorrowingItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  detailContainer: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 30,
    marginLeft: 12,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    alignSelf: 'stretch',
  },
});