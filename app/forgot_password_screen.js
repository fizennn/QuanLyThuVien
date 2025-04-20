import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { router } from "expo-router";
import { requestOTP } from '../api/authApi'; // Import API

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await requestOTP(email); // Gọi API requestOTP
      Alert.alert('Thành công', 'OTP đã được gửi đến email của bạn.');
      router.push('/reset_password_screen'); // Điều hướng đến màn hình đặt lại mật khẩu
    } catch (error) {
      Alert.alert('Lỗi', error.response?.data?.message || 'Không thể gửi yêu cầu OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quên mật khẩu</Text>
      <Text style={styles.subtitle}>Nhập email của bạn để nhận liên kết đặt lại mật khẩu</Text>
      
      <AuthInput 
        icon="envelope"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <AuthButton 
        title="Gửi yêu cầu" 
        onPress={handleResetPassword} 
        style={{ backgroundColor: '#e74c3c' }}
      />
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backToLogin}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  backToLogin: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;