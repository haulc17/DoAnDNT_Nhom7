import React from "react";
import { View, Text, StyleSheet } from "react-native";
import formatToVietnamTime from "../../formatFunction/formatToVietnamTime";
import formatToVND from "../../formatFunction/formatToVND";

const OrderSummary = ({
  totalFoodsAmount,
  shippingFee,
  total,
  status,
  orderDate = null,
}) => {
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
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>
        Chi phí đồ ăn: {formatToVND(totalFoodsAmount)}đ
      </Text>
      <Text style={styles.summaryText}>
        Chi phí giao hàng: {formatToVND(shippingFee)}đ
      </Text>
      <View style={styles.totalTextContainer}>
        <Text style={styles.totalText}>Tổng thanh toán:</Text>
        <Text style={styles.totalFoodsAmount}>{formatToVND(total)}đ</Text>
      </View>
      {status && (
        <Text style={[styles.statusOrder, getStatusStyle(status)]}>
          Tình trạng: {status}
        </Text>
      )}
      {orderDate && (
        <Text style={styles.summaryText}>
          Ngày đặt: {formatToVietnamTime(orderDate)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
  },
  summaryText: {
    fontSize: 16,
    color: "black",
    marginBottom: 3,
  },
  totalTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  totalFoodsAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "orange",
  },
  statusOrder: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default OrderSummary;
