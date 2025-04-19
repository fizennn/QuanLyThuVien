import React from 'react';
import { Modal, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const BookListAdd = ({ visible, onClose, books, onAddBook }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalTitle}>Chọn sách</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={onClose}
              style={styles.closeIcon}
            />
          </View>

          <FlatList
            data={books}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onAddBook(item)}
                style={styles.bookItemContainer}
              >
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{item.tenSach}</Text>
                  {item.tacGia && <Text style={styles.bookAuthor}>{item.tacGia}</Text>}
                </View>
                <Text style={styles.addButtonText}>Thêm</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBookList}>
                <Text style={styles.emptyBookText}>Không có sách nào</Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    margin: 0,
  },
  bookItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
  addButtonText: {
    color: '#2196F3',
    fontWeight: '500',
    fontSize: 14,
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
});

export default BookListAdd;