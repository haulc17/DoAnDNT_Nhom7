import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { URLServer } from "../../../api/apiConfig";
import formatToVND from "../../formatFunction/formatToVND";

const OrderItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${URLServer}/images${item.EncodeAnh}` }}
        style={styles.image}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.Ten}</Text>
        <Text style={styles.itemPrice}>{formatToVND(item.Gia)}đ</Text>
        <Text style={styles.itemQuantity}>SL: x{item.SoLuong}</Text>
        <Text style={styles.itemTotal}>
          {formatToVND(item.Gia * item.SoLuong)}đ
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: "orange" },
  itemQuantity: { fontSize: 14, color: "gray" },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
    flex: 1,
  },
});

export default OrderItem;
