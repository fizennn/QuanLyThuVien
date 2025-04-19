import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import AddGenreForm from "./AddGenreForm";
import { Text, IconButton, Divider } from "react-native-paper";

const AddGenreModal = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View>
                <Text style={styles.formTitle}>Thêm thể loại mới</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={onClose}
                  style={{ position: "absolute", top: -10, right: 0 }}
                />
              </View>
           

              <Divider style={styles.divider} />
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <AddGenreForm
                  onSubmit={(data) => {
                    onSubmit(data);
                    onClose();
                  }}
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

export default AddGenreModal;

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
    height: "auto",
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
