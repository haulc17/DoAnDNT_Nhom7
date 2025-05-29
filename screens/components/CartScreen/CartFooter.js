import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const CartFooter = ({
  totalFoodsAmount,
  selectedItems,
  navigation,
}) => {
  const handleBuyPress = () => {
    if (selectedItems.length === 0) {
      Alert.alert("Thông báo", "Vui lòng thêm vào giỏ hàng trước");
      return;
    }

    navigation.navigate("OrderConfirmScreen", {
      selectedItems,
      totalFoodsAmount,
    });
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.totalText}>Tổng tiền: </Text>
      <Text style={styles.totalFoodsAmount}>
        {totalFoodsAmount.toLocaleString()}₫
      </Text>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={handleBuyPress}
      >
        <Text style={styles.buyButtonText}>
          Mua hàng ({selectedItems.length})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartFooter;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  totalText: { fontSize: 16, color: "black" },
  totalFoodsAmount: { fontSize: 18, fontWeight: "bold", color: "orange" },
  buyButton: {
    backgroundColor: "orange",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buyButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
