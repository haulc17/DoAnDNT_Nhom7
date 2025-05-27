// components/OrderItem.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import formatToVietnamTime from "../../formatFunction/formatToVietnamTime";
import formatToVND from "../../formatFunction/formatToVND";

const OrderItem = ({ item }) => {
  const navigation = useNavigation();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Đã giao":
        return { color: "green" };
      case "Đang xử lý":
        return { color: "orange" };
      case "Đã hủy":
        return { color: "red" };
      default:
        return { color: "black" };
    }
  };

  return (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() =>
        navigation.navigate("OrderHistoryDetailScreen", { order: item })
      }
    >
      <Text style={styles.orderId}>Mã đơn: {item.IDDonHang}</Text>
      <Text style={styles.orderDate}>Ngày đặt: {formatToVietnamTime(item.NgayDat)}</Text>
      <Text style={styles.orderTotal}>Tổng tiền: {formatToVND(item.TongTien)}đ</Text>
      <Text style={[styles.orderStatus, getStatusStyle(item.TinhTrangDon)]}>
        {item.TinhTrangDon}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  orderTotal: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default OrderItem;
