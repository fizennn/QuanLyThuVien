import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPhieuMuon } from '@/redux/actions/phieuMuonActions';
import { fetchBooks } from '@/redux/actions/bookActions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs'; // tiện format ngày tháng

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { borrowings, loading, error } = useSelector(state => state.phieuMuon);
  const { books } = useSelector(state => state.book);
  const { token } = useSelector(state => state.auth);

  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks({ token }));
    dispatch(fetchAllPhieuMuon(token));
  }, [dispatch, token]);

  const getStatistics = () => {
    if (!borrowings || borrowings.length === 0) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredBorrowings = borrowings.filter(phieu => {
      const ngayMuon = new Date(phieu.ngayMuon || phieu.createdAt || phieu.updatedAt || Date.now());
      return ngayMuon >= start && ngayMuon <= end;
    });

    let totalBooksBorrowed = 0;
    let customerSet = new Set();
    const bookCountMap = {};

    filteredBorrowings.forEach(phieu => {
      customerSet.add(phieu.idKhachHang);

      if (phieu.sachMuon && phieu.sachMuon.length > 0) {
        totalBooksBorrowed += phieu.sachMuon.length;

        phieu.sachMuon.forEach(sach => {
          const bookId = typeof sach === 'string' ? sach : sach._id;
          if (bookId) {
            bookCountMap[bookId] = (bookCountMap[bookId] || 0) + 1;
          }
        });
      }
    });

    const sortedBooks = Object.keys(bookCountMap).sort((a, b) => bookCountMap[b] - bookCountMap[a]);

    const top3Books = sortedBooks.slice(0, 3).map(bookId => {
      const book = books.find(b => b._id === bookId) || {};
      return { 
        ...book,
        borrowCount: bookCountMap[bookId]
      };
    });

    const statusStats = { 0: 0, 1: 0, 2: 0, 3: 0 };

    filteredBorrowings.forEach(phieu => {
      statusStats[phieu.trangThai] = (statusStats[phieu.trangThai] || 0) + 1;
    });

    return {
      totalBorrowings: filteredBorrowings.length,
      totalBooksBorrowed,
      totalCustomers: customerSet.size,
      top3Books,
      statusStats,
    };
  };

  const statistics = getStatistics();

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Chờ xử lý';
      case 1: return 'Đã duyệt';
      case 2: return 'Đã trả';
      case 3: return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const handleConfirmStart = (date) => {
    setStartDate(dayjs(date).format('YYYY-MM-DD'));
    setStartPickerVisible(false);
  };

  const handleConfirmEnd = (date) => {
    setEndDate(dayjs(date).format('YYYY-MM-DD'));
    setEndPickerVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📚 Thống kê Phiếu Mượn Sách</Text>

      {/* Date Range */}
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setStartPickerVisible(true)}>
          <Text style={styles.dateButtonText}>{startDate}</Text>
        </TouchableOpacity>
        <Text style={styles.dateSeparator}>đến</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setEndPickerVisible(true)}>
          <Text style={styles.dateButtonText}>{endDate}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        onConfirm={handleConfirmStart}
        onCancel={() => setStartPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        onConfirm={handleConfirmEnd}
        onCancel={() => setEndPickerVisible(false)}
      />

      {/* Statistics */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>❌ {error}</Text>
      ) : statistics ? (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tổng phiếu mượn:</Text>
            <Text style={styles.statValue}>{statistics.totalBorrowings}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tổng sách mượn:</Text>
            <Text style={styles.statValue}>{statistics.totalBooksBorrowed}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Khách hàng mượn:</Text>
            <Text style={styles.statValue}>{statistics.totalCustomers}</Text>
          </View>

          {/* Top 3 Borrowed Books */}
          {statistics.top3Books.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>🏆 Top 3 sách mượn nhiều nhất</Text>
              {statistics.top3Books.map((book, index) => (
                <View key={index} style={styles.bookItem}>
                  <Image source={{ uri: book.anh }} style={styles.bookImage} />
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{book.tenSach}</Text>
                    <Text style={styles.bookCount}>{book.borrowCount} lần mượn</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Status Statistics */}
          <Text style={styles.sectionTitle}>📊 Thống kê trạng thái</Text>
          {Object.keys(statistics.statusStats).map(status => (
            <View key={status} style={styles.statusItem}>
              <Text style={styles.statusLabel}>{getStatusText(parseInt(status))}:</Text>
              <Text style={styles.statusValue}>{statistics.statusStats[status]}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>Không có dữ liệu thống kê.</Text>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
  },
  dateSeparator: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef6fb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
  },
  bookImage: {
    width: 50,
    height: 70,
    borderRadius: 6,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookCount: {
    fontSize: 14,
    color: 'gray',
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
