import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { addPhieuDangKy } from "../redux/actions/phieuDangKyActions";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../theme";

const AddRegistrationModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    idKhachHang: "",
    idNhanVien: user?._id || "",
    ngayDangKy: new Date().toISOString(),
    hanDangKy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // default 7 days later
    sachDangKy: [],
    __v: 0,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isHanPickerVisible, setHanPickerVisibility] = useState(false);

  const handleConfirmNgay = (date) => {
    setFormData({ ...formData, ngayDangKy: date.toISOString() });
    setDatePickerVisibility(false);
  };

  const handleConfirmHan = (date) => {
    setFormData({ ...formData, hanDangKy: date.toISOString() });
    setHanPickerVisibility(false);
  };

  const handleSelectKhachHang = (id) => {
    setFormData({ ...formData, idKhachHang: id });
  };

  const handleSelectSach = (list) => {
    setFormData({ ...formData, sachDangKy: list });
  };

  const handleSubmit = () => {
    if (!formData.idKhachHang || formData.sachDangKy.length === 0) {
      alert("Vui lòng chọn khách hàng và sách!");
      return;
    }

    dispatch(addPhieuDangKy({ data: formData, token }));
    onClose();
    setFormData({
      idKhachHang: "",
      idNhanVien: user?._id || "",
      ngayDangKy: new Date().toISOString(),
      hanDangKy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      sachDangKy: [],
      __v: 0,
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Thêm phiếu đăng ký</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <SelectKhachHang onSelect={handleSelectKhachHang} selectedId={formData.idKhachHang} />
        <SelectSach onSelect={handleSelectSach} selectedList={formData.sachDangKy} />

        <View style={styles.dateRow}>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateBox}>
            <Text>Ngày đăng ký: {formatDate(formData.ngayDangKy)}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setHanPickerVisibility(true)} style={styles.dateBox}>
            <Text>Hạn đăng ký: {formatDate(formData.hanDangKy)}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={formData.sachDangKy}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Text style={styles.bookItem}>📚 {item.tenSach}</Text>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Lưu phiếu đăng ký</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmNgay}
          onCancel={() => setDatePickerVisibility(false)}
        />

        <DateTimePickerModal
          isVisible={isHanPickerVisible}
          mode="date"
          onConfirm={handleConfirmHan}
          onCancel={() => setHanPickerVisibility(false)}
        />
      </View>
    </Modal>
  );
};

export default AddRegistrationModal;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  dateRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },
  dateBox: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    width: "48%",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bookItem: { padding: 8, borderBottomWidth: 1, borderColor: "#eee" },
});
