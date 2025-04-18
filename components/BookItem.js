import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const BookItem = ({ book, theLoai }) => {
  return (
    <View style={styles.bookContainer}>
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
    </View>
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
