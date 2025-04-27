import { StyleSheet, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router"

const { width } = Dimensions.get('window');

const BookDetailsScreen = () => {
  const params = useLocalSearchParams();
  const book = JSON.parse(params.book);
  const theLoai = JSON.parse(params.theLoai);
  const router = useRouter()

  const handleBorrow = () => {
    // Xử lý logic mượn sách ở đây
    console.log('Mượn sách:', book.tenSach);
    // Bạn có thể thêm navigation đến màn hình xác nhận hoặc hiển thị modal
    router.back()
    
  };

  return (
    <>
      <StatusBar backgroundColor="#4c669f" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
          />
          <View style={styles.header}>
            {book.anh && (
              <Image
                source={{ uri: book.anh }}
                style={styles.bookImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.headerInfo}>
              <Text style={styles.title} numberOfLines={2}>{book.tenSach}</Text>
              <Text style={styles.author}>Tác giả: {book.tacGia}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{book.giaMuon.toLocaleString()} VNĐ</Text>
                <Text style={styles.priceLabel}>Giá mượn</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Thể loại:</Text>
              <Text style={styles.detailValue}>{theLoai}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nhà xuất bản:</Text>
              <Text style={styles.detailValue}>{book.nxb}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Số lượng kho:</Text>
              <View style={styles.stockContainer}>
                <Text style={styles.detailValue}>{book.soLuongKho}</Text>
                {book.soLuongKho > 0 ? (
                  <View style={styles.inStockBadge}>
                    <Text style={styles.inStockText}>Còn hàng</Text>
                  </View>
                ) : (
                  <View style={[styles.inStockBadge, styles.outOfStockBadge]}>
                    <Text style={styles.outOfStockText}>Hết hàng</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {book.moTa && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Mô tả sách</Text>
              <Text style={styles.descriptionText}>{book.moTa}</Text>
            </View>
          )}

          {/* Nút mượn sách */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.borrowButton, 
                book.soLuongKho <= 0 && styles.disabledButton
              ]} 
              onPress={handleBorrow}
              disabled={book.soLuongKho <= 0}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={book.soLuongKho > 0 ? ['#4c669f', '#3b5998'] : ['#cccccc', '#999999']}
                style={styles.gradientButton}
              >
                <Text style={styles.borrowButtonText}>
                  {book.soLuongKho > 0 ? 'Mượn sách' : 'Hết sách'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  headerContainer: {
    position: 'relative',
    height: 280,
    marginBottom: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 280,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  bookImage: {
    width: 140,
    height: 210,
    borderRadius: 10,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  author: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  priceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#f5f5f7',
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: '600',
    width: 120,
    color: '#666',
    fontSize: 15,
  },
  detailValue: {
    flex: 1,
    color: '#333',
    fontSize: 15,
  },
  stockContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inStockBadge: {
    backgroundColor: '#e6f7ed',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  inStockText: {
    color: '#00a86b',
    fontSize: 12,
    fontWeight: '600',
  },
  outOfStockBadge: {
    backgroundColor: '#ffebee',
  },
  outOfStockText: {
    color: '#e53935',
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  descriptionText: {
    color: '#444',
    lineHeight: 24,
    fontSize: 15,
  },
  buttonContainer: {
    paddingHorizontal: 0,
    marginTop: 20,
  },
  borrowButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borrowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
});