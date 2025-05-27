import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { purchaseSelectedItems } from "../../api/apiCart";
// import BackHeader from "../components/BackHeader";
import {BackHeader2} from "../components/BackHeader";
import OrderUserInfo from "../components/OrderDetail/OrderUserInfo";
import OrderItem from "../components/OrderDetail/OrderItem";
import OrderSummary from "../components/OrderDetail/OrderSummary";
import OrderButton from "../components/OrderDetail/OrderButton";
import showError from "../components/Error";
showError

const OrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems, totalFoodsAmount } = route.params; // Nhận dữ liệu sản phẩm từ điều hướng

  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // navigation.navigate("Login");
      }
    };
    getUser();
  }, []);

  const shippingFee = 13000;
  const total = totalFoodsAmount + shippingFee;
  const orderItems = selectedItems;
  // console.log(orderItems);

  const purchaseItems = async () => {
    const selectedIDs = orderItems.map((item) => item.IDDoAn);
    if (selectedIDs.length === 0) return;

    try {
      const response = await purchaseSelectedItems(
        selectedIDs,
        total
      );
      Alert.alert("Thành công", "Đơn hàng đã được đặt thành công!");
      navigation.navigate("OrdersHistoryScreen");
    } catch (error) {
      console.error("Lỗi mua hàng:", error);
      showError("Lỗi", "Đã có lỗi xảy ra khi mua hàng.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader2 icon="close" title={"Xác nhận đơn hàng"} />
      <View style={styles.container}>
        {/* Thông tin người dùng */}
        <OrderUserInfo user={user} />
        {/* Danh sách món ăn */}
        <View style={styles.orderContainer}>
          <FlatList
            data={orderItems}
            keyExtractor={(item) => item.IDDoAn.toString()}
            renderItem={({ item }) => <OrderItem item={item} />}
          />
        </View>
        {/* Tóm tắt đơn hàng */}
        <View style={styles.footer}>
          <OrderSummary
            totalFoodsAmount={totalFoodsAmount}
            shippingFee={shippingFee}
            total={total}
            status={null}
          />
          <OrderButton title="Đặt hàng" onPress={purchaseItems} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: "#F9F9F9" },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  orderContainer: { flex: 1, paddingHorizontal: 15 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
  },
});
