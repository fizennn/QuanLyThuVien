import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import {
  Button,
  Text,
  Searchbar,
  Divider,
  IconButton,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "@/redux/actions/bookActions";
import {
  fetchAllPhieuDangKy,
  createPhieuDangKy,
} from "@/redux/actions/phieuDangKyActions";
import FloatingAddButton from "@/components/FloatingAddButton";
import { addPhieuDangKy } from "@/redux/actions/phieuDangKyActions";

const RegistrationScreens = () => {
  const dispatch = useDispatch();
  const { registrations } = useSelector((state) => state.phieuDangKy);
  const { token } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.book);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isBookDialogVisible, setBookDialogVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const [newRegistration, setNewRegistration] = useState({
    idKhachHang: user?.fullname || "",
    ghiChu: "",
    sachMuon: [],
    trangThai: 0,
  });

  useEffect(() => {
    dispatch(fetchAllPhieuDangKy(token));
    dispatch(fetchBooks(token));
  }, [dispatch, token]);

  useEffect(() => {
    setFilteredBooks(books || []);
  }, [books]);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chờ xử lý";
      case 1:
        return "Đã duyệt";
      case 2:
        return "Đã từ chối";
      case 3:
        return "Đã hoàn thành";
      default:
        return "Không xác định";
    }
  };

  const filteredRegistrations = useMemo(() => {
    if (!registrations) return [];
    return registrations
      .filter((item) => item.idKhachHang === user._id) // CHỈ lấy idKhachHang = 333
      .filter(
        (item) =>
          (item.idKhachHang ? item.idKhachHang.toLowerCase() : "").includes(
            searchText.toLowerCase()
          ) ||
          (item.ghiChu ? item.ghiChu.toLowerCase() : "").includes(
            searchText.toLowerCase()
          )
      );
  }, [registrations, searchText]);

  const handleAddBook = (book) => {
    if (!newRegistration.sachMuon.some((b) => b._id === book._id)) {
      setNewRegistration({
        ...newRegistration,
        sachMuon: [...newRegistration.sachMuon, book],
      });
    }
    setBookDialogVisible(false);
  };

  const handleRemoveBook = (bookId) => {
    console.log("Removing book with ID:", bookId);
    setNewRegistration({
      ...newRegistration,
      sachMuon: newRegistration.sachMuon.filter((book) => book._id !== bookId),
    });
  };

  const handleSearchBooks = (query) => {
    setBookSearchQuery(query);
    setFilteredBooks(
      (books || []).filter(
        (book) =>
          book.tenSach.toLowerCase().includes(query.toLowerCase()) ||
          book.id.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSubmit = async () => {
    if (!newRegistration.idKhachHang) {
      Alert.alert("Lỗi", "Vui lòng nhập ID khách hàng");
      return;
    }
    if (newRegistration.sachMuon.length === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một quyển sách");
      return;
    }
    if (newRegistration.ghiChu.length > 500) {
      Alert.alert("Lỗi", "Ghi chú không được vượt quá 500 ký tự");
      return;
    }
    setIsSubmitting(true);
    try {
      newRegistration.idKhachHang = user?._id;
      console.log("Submitting registration:", newRegistration);
      const data = newRegistration
      await dispatch(addPhieuDangKy({data, token})).unwrap();
      setShowAddDialog(false);
      setNewRegistration({
        idKhachHang: user?.fullname || "",
        ghiChu: "",
        sachMuon: [],
        trangThai: 0,
      });
      setBookSearchQuery("");
    } catch (error) {
      console.error("Error submitting registration:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm phiếu đăng ký");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? `${book.id} - ${book.tenSach}` : "Sách không tồn tại";
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách đăng ký mượn sách</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo mã KH hoặc ghi chú..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={filteredRegistrations}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.trangThai === 0 && styles.pendingCard,
              item.trangThai === 1 && styles.approvedCard,
              item.trangThai === 2 && styles.rejectedCard,
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.customerId}>Mã KH: {item.idKhachHang}</Text>
              <Text
                style={[
                  styles.status,
                  item.trangThai === 0 && styles.pendingStatus,
                  item.trangThai === 1 && styles.approvedStatus,
                  item.trangThai === 2 && styles.rejectedStatus,
                ]}
              >
                {getStatusText(item.trangThai)}
              </Text>
            </View>
            <Text style={styles.note}>
              Ghi chú: {item.ghiChu || "Không có ghi chú"}
            </Text>

            <Text style={styles.booksTitle}>Sách muốn mượn:</Text>
            <View style={styles.booksContainer}>
              {item.sachMuon && item.sachMuon.length > 0 ? (
                item.sachMuon.map((book) => (
                  <Text key={book._id} style={styles.bookItem}>
                    • {book.tenSach}
                  </Text>
                ))
              ) : (
                <Text>Không có sách nào</Text>
              )}
            </View>

            {item.idNhanVienXuLy && (
              <Text style={styles.processor}>
                NV xử lý: {item.idNhanVienXuLy}
              </Text>
            )}
          </View>
        )}
      />

      {/* Modal thêm phiếu đăng ký */}
      <Modal visible={showAddDialog} animationType="slide" transparent>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
        <TouchableWithoutFeedback onPress={() => setShowAddDialog(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <View style={styles.headerContainer}>
                  <Text style={styles.modalTitle}>Thêm phiếu đăng ký</Text>
                  <IconButton
                    icon="close"
                    size={24}
                    onPress={() => {
                      setShowAddDialog(false);
                      setNewRegistration({
                        idKhachHang: user?.fullname || "",
                        ghiChu: "",
                        sachMuon: [],
                        trangThai: 0,
                      });
                      setBookSearchQuery("");
                    }}
                    style={styles.closeIcon}
                  />
                </View>
                <Divider style={styles.divider} />
                <FlatList
                  data={[{ key: "header" }, ...newRegistration.sachMuon]}
                  keyExtractor={(item, index) =>
                    item.key ? item.key : item._id.toString()
                  }
                  nestedScrollEnabled={true}
                  renderItem={({ item }) => {
                    if (item.key === "header") {
                      return (
                        <View style={styles.formContainer}>
                          <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Khách hàng</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="Nhập ID khách hàng"
                              value={newRegistration.idKhachHang}
                              onChangeText={(text) =>
                                setNewRegistration({
                                  ...newRegistration,
                                  idKhachHang: text,
                                })
                              }
                              placeholderTextColor="#9E9E9E"
                            />
                          </View>
                          <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Ghi chú</Text>
                            <TextInput
                              style={[styles.input, styles.multilineInput]}
                              placeholder="Nhập ghi chú (tùy chọn)"
                              multiline
                              value={newRegistration.ghiChu}
                              onChangeText={(text) =>
                                setNewRegistration({
                                  ...newRegistration,
                                  ghiChu: text,
                                })
                              }
                              placeholderTextColor="#9E9E9E"
                            />
                          </View>
                          <View style={styles.bookListHeader}>
                            <Text style={styles.bookListTitle}>
                              Danh sách sách đăng ký
                            </Text>
                            <Text style={styles.bookCount}>
                              {newRegistration.sachMuon.length} cuốn
                            </Text>
                          </View>
                          {newRegistration.sachMuon.length === 0 && (
                            <View style={styles.emptyBookList}>
                              <Text style={styles.emptyBookText}>
                                Chưa có sách nào được chọn
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    } else {
                      return (
                        <View style={styles.bookItemContainer}>
                          <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>{item.tenSach}</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleRemoveBook(item._id)}
                            style={styles.removeButton}
                          >
                            <Text style={styles.removeButtonText}>Xóa</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  }}
                  ListFooterComponent={
                    <View style={styles.footerContainer}>
                      <Button
                        mode="outlined"
                        onPress={() => setBookDialogVisible(true)}
                        style={styles.addButton}
                        labelStyle={styles.addButtonLabel}
                        icon="plus"
                      >
                        Thêm sách
                      </Button>
                      <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.submitButton}
                        labelStyle={styles.submitButtonLabel}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                      >
                        Thêm phiếu đăng ký
                      </Button>
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal chọn sách */}
      <Modal visible={isBookDialogVisible} animationType="slide">
        <View style={styles.dialogContainer}>
          <View style={styles.dialogHeader}>
            <Text style={styles.dialogTitle}>Chọn sách</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setBookDialogVisible(false)}
            />
          </View>
          <Searchbar
            placeholder="Tìm kiếm sách"
            value={bookSearchQuery}
            onChangeText={handleSearchBooks}
            style={styles.searchBar}
            iconColor="#555"
            inputStyle={styles.searchInput}
          />
          {filteredBooks.length === 0 ? (
            <View style={styles.emptySearchResult}>
              <Text style={styles.emptySearchText}>
                Không tìm thấy sách phù hợp
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredBooks}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.bookSelectItem}
                  onPress={() => handleAddBook(item)}
                >
                  <View>
                    <Text style={styles.bookSelectTitle}>{item.tenSach}</Text>
                    <Text style={styles.bookSelectAuthor}>
                      Số lượng: {item.soLuongKho}
                    </Text>
                  </View>
                  <IconButton icon="plus-circle" size={20} color="#4CAF50" />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <Divider />}
            />
          )}
          <Button
            onPress={() => setBookDialogVisible(false)}
            style={styles.dialogCloseButton}
            labelStyle={styles.dialogCloseButtonLabel}
          >
            Đóng
          </Button>
        </View>
      </Modal>

      <FloatingAddButton onPress={() => setShowAddDialog(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFA500",
  },
  approvedCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  rejectedCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  customerId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pendingStatus: {
    backgroundColor: "#FFF3E0",
    color: "#FF9800",
  },
  approvedStatus: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },
  rejectedStatus: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },
  note: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    fontStyle: "italic",
  },
  booksTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  booksContainer: {
    marginLeft: 8,
    marginBottom: 8,
  },
  bookItem: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  processor: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
    textAlign: "right",
  },
  // Modal styles
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    margin: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#E Factors0E0",
    marginBottom: 16,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  bookListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  bookListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  bookCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  emptyBookList: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    marginBottom: 16,
  },
  emptyBookText: {
    color: "#888",
    fontSize: 15,
  },
  bookItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: "#FFEBEE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#F44336",
    fontWeight: "500",
    fontSize: 14,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  addButton: {
    marginBottom: 12,
    borderColor: "#2196F3",
    borderRadius: 8,
    borderWidth: 1.5,
  },
  addButtonLabel: {
    color: "#2196F3",
    fontSize: 15,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 6,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 2,
  },
  dialogContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
  },
  dialogHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 0,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  emptySearchResult: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptySearchText: {
    fontSize: 16,
    color: "#888",
  },
  bookSelectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bookSelectTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  bookSelectAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  dialogCloseButton: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  dialogCloseButtonLabel: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RegistrationScreens;
