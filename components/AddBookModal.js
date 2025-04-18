import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import AddBookForm from './AddBookForm';
import { Text } from 'react-native-paper';

const AddBookModal = ({ visible, onClose, onSubmit, theLoai }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text variant="titleMedium" style={{ marginBottom: 16 }}>
                  Thêm sách mới
                </Text>
                <AddBookForm
                  onSubmit={(data) => {
                    onSubmit(data);
                    onClose();
                  }}
                  theLoai={theLoai}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 'auto', // This allows the modal content to resize based on the content
  },
});
