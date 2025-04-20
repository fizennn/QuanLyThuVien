import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';

const BookItem = ({ book, theLoai }) => {
  const router = useRouter();
  const handlePress = () => () => {
    router.push({
      pathname: '/book_details_screen',
      params: { book: JSON.stringify(book), theLoai: JSON.stringify(theLoai) },
    });
  }
  return (
    <TouchableOpacity onPress={handlePress()} style={styles.bookContainer}>
      {book.anh && (
        <Image
          source={{ uri: book.anh }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{book.tenSach}</Text>
        <Text style={styles.author}>Tác giả: {book.tacGia}</Text>
        <Text>
          Thể loại: {theLoai}
        </Text>
        <Text>Nhà xuất bản: {book.nxb}</Text>
        <Text>Giá mượn: {book.giaMuon.toLocaleString()} VNĐ</Text>
        <Text>Số lượng kho: {book.soLuongKho}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  bookContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  bookImage: {
    width: 100,
    height: 140,
    borderRadius: 4,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  description: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#666",
  },
});
