import React, { useState } from "react";
import { StyleSheet, Alert, View, Text } from "react-native";
import { loginUser } from "../../api/apiLoginRegister";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLServer } from "../../api/apiConfig";
import Logo from "../components/LoginRegister/Logo";
import InputField from "../components/LoginRegister/InputField";
import PasswordField from "../components/LoginRegister/PasswordField";
import MainButton from "../components/LoginRegister/MainButton";
import SwitchText from "../components/LoginRegister/SwitchText";
import showError from "../components/Error";

export default function Login() {
  const [TenDangNhap, setTenDangNhap] = useState("");
  const [MatKhau, setMatKhau] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Kiểm tra độ dài
    if (TenDangNhap.length < 6 || MatKhau.length < 6) {
      showError("Lỗi", "Tên đăng nhập và mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      const response = await loginUser(TenDangNhap, MatKhau);

      if (response.success) {
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        Alert.alert("Thành công", "Đăng nhập thành công");
        // console.log("📦 Token đã lưu:", response.token);
        navigation.navigate("HomePage"); // Chuyển hướng đến Profile
      } else {
        Alert.alert("Đăng nhập thất bại");
      }
    } catch (error) {
      // console.error("❌ Lỗi đăng nhập:", error.response || error.message);
      showError("Lỗi", "Lỗi kết nôi với máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      <Logo uri={`${URLServer}/images/logo.jpg`} />

      <Text style={styles.title}>Đăng nhập</Text>

      <InputField
        placeholder="Tên đăng nhập"
        value={TenDangNhap}
        onChangeText={setTenDangNhap}
      />
      <PasswordField
        placeholder="Mật khẩu"
        value={MatKhau}
        onChangeText={setMatKhau}
        secureText={secureText}
        setSecureText={setSecureText}
      />
      <SwitchText
        title="Bạn chưa có tài khoản? Đăng ký ngay"
        onPress={() => navigation.navigate("Register")}
      />
      <MainButton title="Đăng Nhập" onPress={handleLogin} />
      <View style={{ height: 20 }}></View>
      <SwitchText
        title="Về trang chủ?"
        onPress={() => navigation.navigate("HomePage")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
