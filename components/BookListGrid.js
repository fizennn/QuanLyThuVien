import { StyleSheet, FlatList, Dimensions } from "react-native"
import BookItem from "./BookItemGrid"

const { width } = Dimensions.get("window")
const COLUMN_WIDTH = (width - 48) / 2 // 48 = padding (16*2 + gap 16)

const BookList = ({ books, theLoais }) => {
  const renderItem = ({ item }) => (
    <BookItem
      book={item}
      theLoai={theLoais?.find((theLoai) => theLoai._id == item.theLoai)?.tenTheLoai || "Không xác định"}
      width={COLUMN_WIDTH}
    />
  )

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.columnWrapper}
    />
  )
}

export default BookList

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
})
