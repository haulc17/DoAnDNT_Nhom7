import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../components/BackHeader";
import { updateUserProfile } from "../../api/apiLoginRegister";
import ProfileInput from "../components/Profile/ProfileInput";
import PasswordInput from "../components/Profile/PasswordInput";
import SaveButton from "../components/Profile/SaveButton";
import showError from "../components/Error";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigation.navigate("Login");
      }
    };
    getUser();
  }, []);

  // ==== Các hàm kiểm tra dữ liệu ====
  const isValidPhoneNumber = (phone) => {
    const regex = /^[0-9]+$/;
    return regex.test(phone);
  };

  const isValidFullName = (fullName) => {
    const regex = /^[\p{L}\s]+$/u;
    return regex.test(fullName);
  };

  const handleSave = async () => {
    const { HoTen, SDT, DiaChi, MatKhau } = user;

    // Họ tên
    if (!HoTen.trim()) {
      Alert.alert("Lỗi", "Họ tên không được để trống");
      return;
    }

    if (!isValidFullName(HoTen)) {
      Alert.alert("Lỗi", "Họ tên không được chứa các chữ số và ký tự đặc biệt");
      return;
    }

    // Số điện thoại
    if (!SDT.trim()) {
      Alert.alert("Lỗi", "Số điện thoại không được để trống");
      return;
    }

    if (!isValidPhoneNumber(SDT)) {
      Alert.alert("Lỗi", "Số điện thoại chỉ được chứa các chữ số từ 0-9");
      return;
    }

    if (SDT.length !== 10) {
      Alert.alert("Lỗi", "Số điện thoại phải có đúng 10 chữ số");
      return;
    }

    // Địa chỉ
    if (!DiaChi.trim()) {
      Alert.alert("Lỗi", "Địa chỉ không được để trống");
      return;
    }

    if (isValidPhoneNumber(DiaChi)) {
      Alert.alert(
        "Lỗi",
        "Địa chỉ không được chứa ký tự đặc biệt hoặc khoảng trắng giữa các ký tự"
      );
      return;
    }

    // Mật khẩu
    if (!MatKhau.trim()) {
      Alert.alert("Lỗi", "Mật khẩu không được để trống");
      return;
    }

    if (MatKhau.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    // ==== Gọi API sau khi kiểm tra xong ====
    try {
      const response = await updateUserProfile(user);
      if (response.success) {
        Alert.alert("Thành công", "Cập nhật thông tin thành công!");
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        Alert.alert("Lỗi", response.error || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      showError("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  if (!user) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.app}>
      <BackHeader title="Thông tin tài khoản" />
      <View style={styles.container}>
        <ProfileInput label="Tên đăng nhập" value={user.TenDangNhap} editable={false} />
        <ProfileInput label="Họ và tên" value={user.HoTen} onChangeText={(text) => setUser({ ...user, HoTen: text })} />
        <ProfileInput label="Số điện thoại" value={user.SDT} keyboardType="phone-pad" onChangeText={(text) => setUser({ ...user, SDT: text })} />
        <ProfileInput label="Địa chỉ" value={user.DiaChi} onChangeText={(text) => setUser({ ...user, DiaChi: text })} />
        <PasswordInput value={user.MatKhau} onChangeText={(text) => setUser({ ...user, MatKhau: text })} secureText={secureText} setSecureText={setSecureText} />
        <SaveButton onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    marginTop: 20,
    padding: 20,
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
  },
});
