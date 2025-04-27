import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Thư Viện Sách</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('/search_screen')}
        >
          <Feather name="search" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('/profile_screen')}
        >
          <Feather name="user" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
});
