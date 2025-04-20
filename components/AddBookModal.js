import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar
} from "react-native";
import AddBookForm from "./AddBookForm";
import { Text, IconButton, Divider } from "react-native-paper";

const AddBookModal = ({ visible, onClose, onSubmit, theLoai }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View>
                <Text style={styles.formTitle}>Thêm sách mới</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={onClose}
                  style={{ position: "absolute", top: -9, right: 0 }}
                />
              </View>

              <Divider style={styles.divider} />
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <AddBookForm
                  onSubmit={(data) => {
                    onSubmit(data);
                    onClose();
                  }}
                  theLoai={theLoai}
                  onClose={onClose}
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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "auto", // This allows the modal content to resize based on the content
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
});
