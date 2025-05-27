import React from "react";
import { View, Text } from "react-native";
import formatToVND from "../../formatFunction/formatToVND";

const ProductInfo = ({ product }) => (
  <View style={{ padding: 16 }}>
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.Ten}</Text>
    <View
      style={{
        backgroundColor: "orange",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: "flex-start",
        marginTop: 4,
      }}
    >
      <Text style={{ fontSize: 20, color: "#fff" }}>{product.Loai}</Text>
    </View>
    <Text style={{ fontSize: 18, color: "orange", marginVertical: 8 }}>
      {formatToVND(product.Gia)} đ
    </Text>
    <Text style={{ fontSize: 16, color: "#666" }}>
      Mô tả: {product.Mota}
    </Text>
  </View>
);

export default ProductInfo;
