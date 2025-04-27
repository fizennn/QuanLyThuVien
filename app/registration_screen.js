import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, RefreshControl, Alert } from "react-native";
import { Button, Card, Title, Paragraph, Text, ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPhieuDangKy, editPhieuDangKy } from "../redux/actions/phieuDangKyActions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";

const PhieuDangKyScreen = () => {
  const dispatch = useDispatch();
  const { registrations = [], isLoading } = useSelector((state) => state.phieuDangKy);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllPhieuDangKy(token));
  }, [dispatch, token]);

  const handleApprove = async (id) => {
    try {
      await dispatch(editPhieuDangKy({ 
        id, 
        data: { trangThai: 1, idNhanVienXuLy: user._id }, 
        token 
      })).unwrap();
      Alert.alert("Thành công", "Phiếu đăng ký đã được chấp nhận");
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Không thể chấp nhận phiếu đăng ký");
    }
  };

  const handleReject = async (id) => {
    try {
      await dispatch(editPhieuDangKy({ 
        id, 
        data: { trangThai: 2, idNhanVienXuLy: user._id }, 
        token 
      })).unwrap();
      Alert.alert("Thành công", "Phiếu đăng ký đã bị từ chối");
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Không thể từ chối phiếu đăng ký");
    }
  };

  const getStatusText = (trangThai) => {
    switch (trangThai) {
      case 0: return "🟡 Chờ xử lý";
      case 1: return "🟢 Đã duyệt";
      case 2: return "🔴 Đã từ chối";
      default: return "";
    }
  };

  const getStatusColor = (trangThai) => {
    switch (trangThai) {
      case 0: return "#FFA500";
      case 1: return "#2ECC71";
      case 2: return "#E74C3C";
      default: return "#95A5A6";
    
    }
  };

  const sortedRegistrations = [...registrations].sort((a, b) => {
    // Ưu tiên đơn chờ xử lý (trangThai === 0) lên đầu
    if (a.trangThai === 0 && b.trangThai !== 0) return -1;
    if (a.trangThai !== 0 && b.trangThai === 0) return 1;
    
    // Nếu cùng trạng thái, sắp xếp theo thời gian tạo (mới nhất lên đầu)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.title}>
            <Icon name="account-circle" size={20} color="#3498DB" /> 
            {" "}Người mượn: {item.idKhachHang || "Không xác định"}
          </Title>
          <Text style={[styles.status, { color: getStatusColor(item.trangThai) }]}>
            {getStatusText(item.trangThai)}
          </Text>
        </View>
        
        <Paragraph style={styles.text}>
          <Icon name="calendar-clock" size={16} color="#7F8C8D" /> 
          {" "}Ngày tạo: {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
        </Paragraph>
        
        {item.ghiChu && (
          <Paragraph style={styles.text}>
            <Icon name="note-text" size={16} color="#7F8C8D" /> 
            {" "}Ghi chú: {item.ghiChu}
          </Paragraph>
        )}

        {item.idNhanVienXuLy && (
          <Paragraph style={styles.text}>
            <Icon name="account-tie" size={16} color="#7F8C8D" /> 
            {" "}NV xử lý: {item.idNhanVienXuLy?.hoTen || item.idNhanVienXuLy}
          </Paragraph>
        )}

        <View style={styles.booksContainer}>
          <Text style={styles.sectionTitle}>
            <Icon name="book-multiple" size={16} color="#3498DB" /> 
            {" "}Sách mượn:
          </Text>
          {item.sachMuon.map((book) => (
            <View key={book._id} style={styles.bookItem}>
              <Icon name="book" size={14} color="#95A5A6" />
              <Text style={styles.bookText}> {book.tenSach}</Text>
            </View>
          ))}
        </View>

        {item.trangThai === 0 && (
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => handleApprove(item._id)}
              style={styles.approveButton}
              labelStyle={styles.buttonLabel}
              icon="check-circle"
            >
              Chấp nhận
            </Button>
            <Button
              mode="contained"
              onPress={() => handleReject(item._id)}
              style={styles.rejectButton}
              labelStyle={styles.buttonLabel}
              icon="close-circle"
            >
              Từ chối
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  if (isLoading && registrations.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#3498DB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedRegistrations}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchAllPhieuDangKy(token))}
            colors={["#3498DB"]}
            tintColor="#3498DB"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="text-search" size={60} color="#BDC3C7" />
            <Text style={styles.emptyText}>Không có phiếu đăng ký nào</Text>
          </View>
        }
        contentContainerStyle={registrations.length === 0 && styles.centeredContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    flex: 1,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  text: {
    fontSize: 14,
    color: "#34495E",
    marginVertical: 2,
  },
  booksContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ECF0F1",
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 6,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    paddingLeft: 4,
  },
  bookText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ECF0F1",
  },
  approveButton: {
    backgroundColor: "#2ECC71",
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
    paddingVertical: 2,
  },
  rejectButton: {
    backgroundColor: "#E74C3C",
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    paddingVertical: 2,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#95A5A6",
    fontWeight: "500",
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default PhieuDangKyScreen;