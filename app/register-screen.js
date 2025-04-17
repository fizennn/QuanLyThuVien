import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { router } from "expo-router";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Xử lý đăng ký ở đây
    console.log('Register data:', { name, email, password, confirmPassword });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng ký tài khoản</Text>
      
      <AuthInput 
        icon="user"
        placeholder="Họ và tên"
        value={name}
        onChangeText={setName}
      />
      
      <AuthInput 
        icon="envelope"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <AuthInput 
        icon="lock"
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <AuthInput 
        icon="lock"
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <AuthButton 
        title="Đăng ký" 
        onPress={handleRegister} 
        style={{ backgroundColor: '#2ecc71' }}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.push('/login-screen')}>
          <Text style={styles.footerLink}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;