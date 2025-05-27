import React from "react";
import { TouchableOpacity, Text } from "react-native";

const AddToCartButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "orange",
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20,
      marginHorizontal: 16,
    }}
    onPress={onPress}
  >
    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
      Thêm vào giỏ hàng
    </Text>
  </TouchableOpacity>
);

export default AddToCartButton;
