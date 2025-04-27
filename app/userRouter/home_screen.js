"use client"

import { useEffect } from "react"
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks, addBook } from "@/redux/actions/bookActions"
import { fetchAllTheLoai } from "@/redux/actions/theLoaiActions"
import BookList from "@/components/BookListGrid"
import Header from "@/components/Header"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { books } = useSelector((state) => state.book)
  const { theLoai } = useSelector((state) => state.theLoai)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchBooks({ token }))
    dispatch(fetchAllTheLoai({ token }))
  }, [])

  const handleAddBook = (bookData) => {
    dispatch(addBook({ bookData, token }))
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />
      <View style={styles.container}>
        {books?.length > 0 ? (
          <BookList books={books} theLoais={theLoai} />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có sách nào</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
})
