import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { URLServer } from "../../../api/apiConfig";
import formatToVND from "../../formatFunction/formatToVND";

const FoodItem = ({ item, onBuy }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${URLServer}/images${item.EncodeAnh}` }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.Ten}</Text>
        <Text style={styles.itemType}>{item.Loai}</Text>
        <Text style={styles.itemPrice}>
          {formatToVND(item.Gia)}đ
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => onBuy(item)}
      >
        <Text style={styles.buyButtonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemType: {
    color: "gray",
  },
  itemPrice: {
    color: "red",
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "orange",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
