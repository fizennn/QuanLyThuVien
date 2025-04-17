import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AuthButton from '../components/AuthButton';
import { router } from "expo-router";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Chào mừng bạn đến với ứng dụng của chúng tôi</Text>
      <Text style={styles.subtitle}>Hãy bắt đầu hành trình của bạn</Text>
      
      <View style={styles.buttonContainer}>
        <AuthButton 
          title="Đăng nhập" 
          onPress={() => router.push('/login-screen')} 
          style={{ backgroundColor: '#3498db' }}
        />
        <AuthButton 
          title="Đăng ký" 
          onPress={() => router.push('/register-screen')} 
          style={{ backgroundColor: '#2ecc71' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

export default WelcomeScreen;