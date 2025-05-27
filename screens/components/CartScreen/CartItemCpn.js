import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import formatToVND from "../../formatFunction/formatToVND";

const CartItemCpn = ({
  item,
  toggleItemSelection,
  updateQuantity,
  removeItem,
  URLServer,
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.selectableArea}
        onPress={() => toggleItemSelection(item.IDDoAn)}
        activeOpacity={0.7}
      >
        <Checkbox
          value={item.selected}
          onValueChange={() => toggleItemSelection(item.IDDoAn)}
          color="orange"
          style={styles.checkbox}
        />
        <Image
          source={{ uri: `${URLServer}/images${item.EncodeAnh}` }}
          style={styles.image}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.TenDoAn}</Text>
          <Text style={styles.itemPrice}>{formatToVND(item.Gia)}₫</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.IDDoAn, -1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.SoLuong}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.IDDoAn, 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.IDDoAn)}
      >
        <Text style={styles.removeText}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItemCpn;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  selectableArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "orange",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
  removeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});
