import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  // Sử dụng books để tra cứu tên sách
  const bookNames = borrowing.sachMuon.map(bookId => {
    const book = books.find(b => b._id === bookId);
    return book ? book.tenSach : bookId;
  });

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Phần chi tiết bên trái */}
        <View style={styles.detailContainer}>
          <Text style={styles.title}>Mã phiếu: {borrowing._id}</Text>
          <Text>Khách hàng: {borrowing.idKhachHang}</Text>
          <Text>Nhân viên: {borrowing.idNhanVien}</Text>
          <Text>
            Ngày mượn: {new Date(borrowing.ngayMuon).toLocaleDateString()}
          </Text>
          <Text>
            Hạn trả: {new Date(borrowing.hanTra).toLocaleDateString()}
          </Text>
          <Text>Sách mượn: {bookNames.join(', ')}</Text>
        </View>
        {/* Phần trạng thái bên phải chỉ hiển thị màu sắc */}
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(borrowing.trangThai) }
          ]}
        />
      </View>
    </View>
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
    width: 30,           // chiếm 1 phần chiều rộng, bạn có thể điều chỉnh giá trị này theo yêu cầu
    marginLeft: 12,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    alignSelf: 'stretch', // làm đầy chiều cao của container
  },
});