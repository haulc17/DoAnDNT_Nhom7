import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../components/BackHeader";
import AccountInfo from "../components/AccountSetting/AccountInfo";
import CardAccountInfo from "../components/AccountSetting/CardAccountInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RefreshableScrollView from "../components/RefreshableScrollView";
import { URLServer } from "../../api/apiConfig";

const AccountSetting = () => {
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation();

  const getUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigation.navigate("Login");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "HomePage" }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <RefreshableScrollView onRefresh={getUser} style={{}}>
        <BackHeader title="Tài khoản" />
        <AccountInfo user={user} />
        <View style={styles.containerCardInfo}>
          <CardAccountInfo
            URIimg={`${URLServer}/images/accountSetting/penIcon.png`}
            textContent="Cập nhật thông tin"
            handlePress={() => navigation.navigate("Profile")}
          />
          <CardAccountInfo
            URIimg={`${URLServer}/images/accountSetting/cartIcon.png`}
            textContent="Xem giỏ hàng"
            handlePress={() => navigation.navigate("CartScreen")}
          />
          <CardAccountInfo
            URIimg={`${URLServer}/images/accountSetting/orderIcon.png`}
            textContent="Xem đơn hàng"
            handlePress={() => navigation.navigate("OrdersHistoryScreen")}
          />
          <CardAccountInfo
            URIimg={`${URLServer}/images/accountSetting/exitIcon.png`}
            textContent="Đăng xuất"
            handlePress={handleLogout}
          />
        </View>

      </RefreshableScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerCardInfo: {
    alignItems: "center",
    marginTop: 40,
  },
});

export default AccountSetting;
