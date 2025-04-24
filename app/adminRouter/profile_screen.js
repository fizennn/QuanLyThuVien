import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Mail, Phone, MapPin, User, Edit2 } from "lucide-react-native";
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native";
import React from "react";


const ProfileScreen = () => {
  const { user, loading } = useSelector((state) => state.auth)
  useFocusEffect(
    React.useCallback(() => {
      // Khi màn hình được focus: đặt cấu hình StatusBar cho màn hình này
      StatusBar.setBackgroundColor("#1976D2");
      StatusBar.setBarStyle("light-content");

      return () => {
        // Khi màn hình mất focus: thiết lập lại trạng thái mặc định (có thể thay đổi theo yêu cầu)
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("dark-content");
      };
    }, [])
  );


  
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
      
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri:
                user?.anh ,
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.fullName}>{user?.fullname || "Không Xác Định"}</Text>
        <Text style={styles.username}>
          @{user?.username?.split("@")[0] || "Không Xác Định"}
        </Text>

        <TouchableOpacity style={styles.editButton}>
          <Edit2 size={16} color="#ffffff" />
          <Text style={styles.editButtonText}>Chỉnh Sửa</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Mail size={20} color="#4A55A2" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>
              {user?.email || "huylqph49142@gmail.com"}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Phone size={20} color="#4A55A2" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Số Điện Thoại</Text>
            <Text style={styles.infoValue}>{user?.phone || "0945678901"}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <MapPin size={20} color="#4A55A2" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Địa Chỉ</Text>
            <Text style={styles.infoValue}>{user?.address || "Ha Noi"}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <User size={20} color="#4A55A2" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Quyền Hạn</Text>
            <Text style={styles.infoValue}>
              {user?.role === 2 ? "Admin" : "User"}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Trạng Thái Tài Khoản</Text>
          <View
            style={[
              styles.statusBadge,
              user?.status === 1 ? styles.activeStatus : styles.inactiveStatus,
            ]}
          >
            <Text style={styles.statusText}>
              {user?.status === 1 ? "Hoạt Động" : "Cấm"}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#1976D2",
    paddingTop: 0,
    paddingBottom: 15,
    alignItems: "center",
    borderBottomLeftRadius:60,
    borderBottomRightRadius: 60,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#ffffff",
    overflow: "hidden",
    marginBottom: 15,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#E5E0FF",
    marginBottom: 15,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#ffffff",
    marginLeft: 8,
    fontWeight: "500",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#E5E0FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  statusContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: "#E7F9ED",
  },
  inactiveStatus: {
    backgroundColor: "#FFE9E9",
  },
  statusText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
});
