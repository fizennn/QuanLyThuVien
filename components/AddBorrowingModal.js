import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Text, Searchbar, Divider, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addPhieuMuon } from '../redux/actions/phieuMuonActions';

const AddBorrowingModal = ({ visible, onClose, onSubmit, employee = {}, availableBooks = [] }) => {
  const initialState = {
    idKhachHang: '',
    idNhanVien: employee._id || '',
    ngayMuon: new Date().toISOString(),
    hanTra: '',
    sachMuon: [],
    __v: 0,
  };

  const [borrowing, setBorrowing] = useState(initialState);
  const [isBookDialogVisible, setBookDialogVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(availableBooks);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Lấy token từ Redux store

  useEffect(() => {
    setFilteredBooks(availableBooks);
  }, [availableBooks]);

  const handleChange = (key, value) => {
    setBorrowing(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addPhieuMuon({ data: borrowing, token })).unwrap(); // Gọi API thêm phiếu mượn
      onSubmit(borrowing); // Gọi callback nếu cần
      onClose(); // Đóng modal
      setBorrowing(initialState); // Reset form
    } catch (error) {
      console.error('Error submitting borrowing:', error);
      // Xử lý lỗi (hiển thị thông báo, v.v.)
    }
  };

  const handleAddBook = (book) => {
    setBorrowing(prev => ({
      ...prev,
      sachMuon: [...prev.sachMuon, book],
    }));
    setBookDialogVisible(false);
  };

  const handleRemoveBook = (bookId) => {
    setBorrowing(prev => ({
      ...prev,
      sachMuon: prev.sachMuon.filter(book => book._id !== bookId),
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredBooks(
      availableBooks.filter(book =>
        book.tenSach.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <View style={styles.headerContainer}>
                  <Text style={styles.modalTitle}>Thêm phiếu mượn</Text>
                  <IconButton
                    icon="close"
                    size={24}
                    onPress={onClose}
                    style={styles.closeIcon}
                  />
                </View>
                
                <Divider style={styles.divider} />
                
                <FlatList
                  data={[{ key: 'header' }, ...borrowing.sachMuon]}
                  keyExtractor={(item, index) => (item.key ? item.key : index.toString())}
                  nestedScrollEnabled={true}
                  renderItem={({ item }) => {
                    if (item.key === 'header') {
                      return (
                        <View style={styles.formContainer}>
                          <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Khách hàng</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="Nhập ID khách hàng"
                              value={borrowing.idKhachHang}
                              onChangeText={(text) => handleChange('idKhachHang', text)}
                              placeholderTextColor="#9E9E9E"
                            />
                          </View>
                          
                          <View style={styles.infoGroup}>
                            <Text style={styles.infoLabel}>Nhân viên:</Text>
                            <Text style={styles.infoValue}>{employee.fullname || 'Chưa xác định'}</Text>
                          </View>
                          
                          <View style={styles.infoGroup}>
                            <Text style={styles.infoLabel}>Ngày mượn:</Text>
                            <Text style={styles.infoValue}>
                              {formatDate(borrowing.ngayMuon)}
                            </Text>
                          </View>
                          
                          <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Hạn trả</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="Nhập ngày hạn trả (YYYY-MM-DD)"
                              value={borrowing.hanTra}
                              onChangeText={(text) => handleChange('hanTra', text)}
                              placeholderTextColor="#9E9E9E"
                            />
                          </View>
                          
                          <View style={styles.bookListHeader}>
                            <Text style={styles.bookListTitle}>Danh sách sách mượn</Text>
                            <Text style={styles.bookCount}>
                              {borrowing.sachMuon.length} cuốn
                            </Text>
                          </View>
                          
                          {borrowing.sachMuon.length === 0 && (
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
                            {item.tacGia && (
                              <Text style={styles.bookAuthor}>{item.tacGia}</Text>
                            )}
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
                      >
                        Thêm phiếu mượn
                      </Button>
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Dialog chọn sách */}
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
            value={searchQuery}
            onChangeText={handleSearch}
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
                    {item.tacGia && (
                      <Text style={styles.bookSelectAuthor}>{item.tacGia}</Text>
                    )}
                  </View>
                  <IconButton
                    icon="plus-circle"
                    size={20}
                    color="#4CAF50"
                  />
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
    </>
  );
};

export default AddBorrowingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    margin: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
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
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  bookListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  bookListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  emptyBookList: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    marginBottom: 16,
  },
  emptyBookText: {
    color: '#888',
    fontSize: 15,
  },
  bookItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#F44336',
    fontWeight: '500',
    fontSize: 14,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  addButton: {
    marginBottom: 12,
    borderColor: '#2196F3',
    borderRadius: 8,
    borderWidth: 1.5,
  },
  addButtonLabel: {
    color: '#2196F3',
    fontSize: 15,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 6,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 2,
  },
  dialogContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 0,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  emptySearchResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptySearchText: {
    fontSize: 16,
    color: '#888',
  },
  bookSelectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bookSelectTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  bookSelectAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  dialogCloseButton: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  dialogCloseButtonLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});