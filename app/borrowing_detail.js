import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BorrowingDetail = () => {
  const params = useLocalSearchParams();
  
  // Parse các tham số
  const bookIds = JSON.parse(params.bookIds);
  const bookNames = JSON.parse(params.bookNames);
  const status = parseInt(params.status);
  
  
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chưa trả";
      case 1:
        return "Đã trả";
      case 2:
        return "Quá hạn";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "#757575"; // xám đậm hơn
      case 1:
        return "#4CAF50"; // xanh lá cây
      case 2:
        return "#FFC107"; // vàng
      default:
        return "#000000"; // mặc định đen
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 0:
        return "#EEEEEE"; // xám nhạt
      case 1:
        return "#E8F5E9"; // xanh lá nhạt
      case 2:
        return "#FFF8E1"; // vàng nhạt
      default:
        return "#FFFFFF"; // mặc định trắng
    }
  };
  const router = useRouter();
  return (
    
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chi tiết phiếu mượn</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.detailContainer}>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.label}>Mã phiếu:</Text>
                <Text style={styles.value}>{params.id}</Text>
              </View>
              
              <View style={styles.row}>
                <Text style={styles.label}>Khách hàng:</Text>
                <Text style={styles.value}>{params.customerId}</Text>
              </View>
              
              <View style={styles.row}>
                <Text style={styles.label}>Nhân viên:</Text>
                <Text style={styles.value}>{params.staffId}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.label}>Ngày mượn:</Text>
                <Text style={styles.value}>
                  {new Date(params.borrowDate).toLocaleDateString()}
                </Text>
              </View>
              
              <View style={styles.row}>
                <Text style={styles.label}>Hạn trả:</Text>
                <Text style={styles.value}>
                  {new Date(params.dueDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Danh sách sách</Text>
              <View style={styles.bookList}>
                {bookNames.map((name, index) => (
                  <View key={index} style={styles.bookItemContainer}>
                    <Text style={styles.bookItem}>
                      <Text style={styles.bulletPoint}>•</Text> {name}
                    </Text>
                    <Text style={styles.bookId}>ID: {bookIds[index]}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statusSection}>
              <Text style={styles.statusLabel}>Trạng thái:</Text>
              <View 
                style={[
                  styles.statusBadge, 
                  { backgroundColor: getStatusBackgroundColor(status) }
                ]} 
              >
                <View 
                  style={[
                    styles.statusIndicator, 
                    { backgroundColor: getStatusColor(status) }
                  ]} 
                />
                <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
                  {getStatusText(status)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 16,
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 4,
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  detailContainer: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    width: 100,
    color: '#424242',
  },
  value: {
    flex: 1,
    color: '#212121',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  bookList: {
    marginTop: 8,
  },
  bookItemContainer: {
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 6,
  },
  bookItem: {
    fontSize: 15,
    color: '#212121',
  },
  bulletPoint: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  bookId: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
    marginLeft: 15,
  },
  statusSection: {
    padding: 16,
  },
  statusLabel: {
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontWeight: 'bold',
  },
});

export default BorrowingDetail;