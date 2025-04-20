import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { router } from "expo-router";
import { resetPassword } from '../api/authApi'; // Import API

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(email, otp, newPassword); // Gọi API resetPassword
      Alert.alert('Thành công', 'Mật khẩu của bạn đã được đặt lại.');
      router.push('/login_screen'); // Điều hướng về màn hình đăng nhập
    } catch (error) {
      Alert.alert('Lỗi', error.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đặt lại mật khẩu</Text>
      <Text style={styles.subtitle}>Nhập email, mã OTP và mật khẩu mới của bạn</Text>
      
      <AuthInput 
        icon="envelope"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <AuthInput 
        icon="key"
        placeholder="Mã OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <AuthInput 
        icon="lock"
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      
      <AuthButton 
        title="Đặt lại mật khẩu" 
        onPress={handleResetPassword} 
        style={{ backgroundColor: '#27ae60' }}
      />
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
});

export default ResetPasswordScreen;