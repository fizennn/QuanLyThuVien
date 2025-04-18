import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";

const LoginScreen = () => {
  console.log("LoginScreen rendered");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user != null) {
      if (user.role == 0) {
        router.push("/userRouter");
      } else {
        router.push("/adminRouter");
      }
    }
  }, [user]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }

    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng nhập</Text>

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

      <TouchableOpacity onPress={() => router.push("/forgot-password-screen")}>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <AuthButton
        title={loading ? "Đang đăng nhập..." : "Đăng nhập"}
        onPress={handleLogin}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Chưa có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            router.back(), router.push("/register-screen");
          }}
        >
          <Text style={styles.footerLink}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  forgotPassword: {
    color: "#3498db",
    textAlign: "right",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
  },
  footerLink: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default LoginScreen;
