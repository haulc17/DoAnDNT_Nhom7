import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const OrderButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.orderButton} onPress={onPress}>
      <Text style={styles.orderButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderButton: {
    backgroundColor: "orange",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  orderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderButton;
