import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { registerUser } from "../../api/apiLoginRegister";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/LoginRegister/Logo";
import InputField from "../components/LoginRegister/InputField";
import PasswordField from "../components/LoginRegister/PasswordField";
import MainButton from "../components/LoginRegister/MainButton";
import SwitchText from "../components/LoginRegister/SwitchText";
import { URLServer } from "../../api/apiConfig";

export default function Register() {
  const [TenDangNhap, setTenDangNhap] = useState("");
  const [MatKhau, setMatKhau] = useState("");
  const [HoTen, setHoTen] = useState("");
  const [SDT, setSDT] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Kiểm tra độ dài
    if (TenDangNhap.length < 6 || MatKhau.length < 6) {
      Alert.alert("Lỗi", "Tên đăng nhập và mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      await registerUser(TenDangNhap, MatKhau, HoTen, SDT, DiaChi);
      Alert.alert("Thành công", "Đăng ký thành công!");
      navigation.navigate("Login" as never);
    } catch (error: any) {
      Alert.alert("Lỗi", error.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      <Logo uri={`${URLServer}/images/logo.jpg`} />

      <Text style={styles.header}>Đăng Ký</Text>

      <InputField
        placeholder="Tên đăng nhập"
        value={TenDangNhap}
        onChangeText={setTenDangNhap}
      />
      <InputField
        placeholder="Họ và tên"
        value={HoTen}
        onChangeText={setHoTen}
      />
      <InputField
        placeholder="Số điện thoại"
        value={SDT}
        onChangeText={setSDT}
      />
      <InputField
        placeholder="Địa chỉ"
        value={DiaChi}
        onChangeText={setDiaChi}
      />
      <PasswordField
        placeholder="Mật khẩu"
        value={MatKhau}
        onChangeText={setMatKhau}
        secureText={secureText}
        setSecureText={setSecureText}
      />
      <SwitchText
        title="Bạn đã có tài khoản? Đăng nhập ngay"
        onPress={() => navigation.navigate("Login")}
      />

      <MainButton title="Đăng Ký" onPress={handleRegister} />

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
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  switchText: { color: "#f90", marginBottom: 20 },
  button: { backgroundColor: "#f90", padding: 15, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  homeLink: { marginTop: 20, color: "#f90" },
});
