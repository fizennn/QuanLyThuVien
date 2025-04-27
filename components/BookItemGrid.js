"use client"

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

const BookItem = ({ book, theLoai, width }) => {
  const router = useRouter()

  const handlePress = () => {
    router.push({
      pathname: "/book_details_screen",
      params: { book: JSON.stringify(book), theLoai: JSON.stringify(theLoai) },
    })
  }

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.bookContainer, { width: width }]}>
      {book.anh ? (
        <Image source={{ uri: book.anh }} style={styles.bookImage} resizeMode="cover" />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {book.tenSach}
        </Text>
        <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
          {book.tacGia}
        </Text>
        <Text style={styles.category} numberOfLines={1} ellipsizeMode="tail">
          {theLoai}
        </Text>
        <Text style={styles.price}>{book.giaMuon.toLocaleString()} VNĐ</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BookItem

const styles = StyleSheet.create({
  bookContainer: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderText: {
    color: "#666",
  },
  bookInfo: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    height: 40,
  },
  author: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: "600",
    color: "#e63946",
  },
})
