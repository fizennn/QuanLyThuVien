import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from 'expo-router';

const BookDetailsScreen = () => {
  const params = useLocalSearchParams();
  const book = JSON.parse(params.book);
  const theLoai = JSON.parse(params.theLoai);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {book.anh && (
          <Image
            source={{ uri: book.anh }}
            style={styles.bookImage}
            resizeMode="contain"
          />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{book.tenSach}</Text>
          <Text style={styles.author}>Tác giả: {book.tacGia}</Text>
          <Text style={styles.price}>Giá mượn: {book.giaMuon.toLocaleString()} VNĐ</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Thể loại:</Text>
          <Text style={styles.detailValue}>{theLoai}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nhà xuất bản:</Text>
          <Text style={styles.detailValue}>{book.nxb}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Số lượng kho:</Text>
          <Text style={styles.detailValue}>{book.soLuongKho}</Text>
        </View>
      </View>

      {book.moTa && (
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Mô tả sách</Text>
          <Text style={styles.descriptionText}>{book.moTa}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 5,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e63946',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 120,
    color: '#555',
  },
  detailValue: {
    flex: 1,
    color: '#333',
  },
  descriptionSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionText: {
    color: '#333',
    lineHeight: 22,
  },
});