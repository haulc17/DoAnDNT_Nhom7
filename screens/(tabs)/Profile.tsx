import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../components/BackHeader";
import { updateUserProfile } from "../../api/apiLoginRegister";

// Import các component nhỏ
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

  const handleSave = async () => {
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
      // Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau!");
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
