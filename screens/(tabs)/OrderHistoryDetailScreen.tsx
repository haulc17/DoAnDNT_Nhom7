import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getOrderDetail, cancelOrder } from "../../api/apiOrdersHistory"; 
import {BackHeader2} from "../components/BackHeader";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderUserInfo from "../components/OrderDetail/OrderUserInfo";
import OrderItem from "../components/OrderDetail/OrderItem";
import OrderSummary from "../components/OrderDetail/OrderSummary";
import OrderButton from "../components/OrderDetail/OrderButton";
import showError from "../components/Error";

const OrderHistoryDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true); // Bắt đầu trạng thái loading
      const data = await getOrderDetail(order.IDDonHang);
      setOrderDetail(data);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      showError("Lỗi khi tải chi tiết đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };
  useEffect(() => {
    fetchOrderDetail();
  }, [order]);

  const handleCancelOrder = async () => {
    try {
      const confirm = await new Promise((resolve) => {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc chắn muốn hủy đơn hàng này?",
          [
            { text: "Không", onPress: () => resolve(false) },
            { text: "Có", onPress: () => resolve(true) },
          ],
          { cancelable: false }
        );
      });

      if (!confirm) return;

      await cancelOrder(order.IDDonHang);
      Alert.alert("Thành công", "Đơn hàng đã được hủy.");
      navigation.navigate("OrdersHistoryScreen"); // Quay lại danh sách đơn hàng
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      showError("Lỗi", "Không thể hủy đơn hàng. Vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return <Loading />; // Hiển thị Loading khi đang tải dữ liệu
  }

  const shippingFee = 13000;

  return (
    <SafeAreaView style={styles.app}>
      <BackHeader2 title="Chi tiết đơn hàng" />
      {orderDetail.length > 0 && (
        <View style={styles.container}>
          {/* Thông tin người dùng */}
          <OrderUserInfo user={orderDetail[0]} />
          {/* Danh sách món ăn */}
          <View style={styles.orderContainer}>
            <FlatList
              data={orderDetail}
              keyExtractor={(item) => item.IDDoAn.toString()}
              renderItem={({ item }) => <OrderItem item={item} />}
              refreshing={loading}
              onRefresh={fetchOrderDetail}
            />
          </View>
          {/* Tóm tắt đơn hàng */}
          <View style={styles.footer}>
            <OrderSummary
              totalFoodsAmount={orderDetail[0].TongTien - shippingFee}
              shippingFee={shippingFee}
              total={orderDetail[0].TongTien}
              status={orderDetail[0].TinhTrangDon}
              orderDate={orderDetail[0].NgayDat}
            />
            {["", "Đang xử lý", "Chờ xác nhận", null].includes(
              orderDetail[0].TinhTrangDon
            ) && <OrderButton title="Hủy đơn" onPress={handleCancelOrder} />}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

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

export default OrderHistoryDetailsScreen;
