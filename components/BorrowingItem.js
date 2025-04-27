import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return "#9ca3af"; // xám nhạt
    case 1:
      return "#10b981"; // xanh lá cây tươi sáng
    case 2:
      return "#f59e0b"; // vàng cam
    default:
      return "#6b7280"; // mặc định xám đậm
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return "Chờ xử lý";
    case 1:
      return "Đã mượn";
    case 2:
      return "Quá hạn";
    default:
      return "Không xác định";
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
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>Mã phiếu: {borrowing._id}</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Khách hàng:</Text>
              <Text style={styles.value}>{borrowing.idKhachHang}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nhân viên:</Text>
              <Text style={styles.value}>{borrowing.idNhanVien}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ngày mượn:</Text>
              <Text style={styles.value}>
                {new Date(borrowing.ngayMuon).toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Hạn trả:</Text>
              <Text style={styles.value}>{borrowing.hanTra}</Text>
            </View>
            
            <View style={styles.bookContainer}>
              <Text style={styles.label}>Sách mượn:</Text>
              <Text style={styles.bookNames} numberOfLines={2}>
                {bookNames.join(', ')}
              </Text>
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(borrowing.trangThai) }
              ]}
            />
            <Text style={styles.statusText}>
              {getStatusText(borrowing.trangThai)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BorrowingItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  detailContainer: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    width: 90,
  },
  value: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  bookContainer: {
    marginTop: 8,
  },
  bookNames: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  statusContainer: {
    width: 80,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
});