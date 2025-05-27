import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackHeader from "../components/BackHeader";
import { getFoodsByType } from "../../api/apiFoods";
import { addToCart } from "../../api/apiCart";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, FlatList, RefreshControl } from "react-native";
import FoodItem from "../components/Category/FoodItem";
import showError from "../components/Error";

const Category = () => {
  const [foodsbyType, setFoodsbyType] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { foods, foodType, user } = route.params;

  const getFsBT = async () => {
    try {
      if (foods) {
        setFoodsbyType(foods);
      } else {
        const result = await getFoodsByType(foodType.Loai);
        setFoodsbyType(result);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      showError("Lỗi",  "Lỗi khi lấy dữ liệu đồ ăn theo loại.")
    }
  };

  useEffect(() => {
    getFsBT();
  }, []);

  const handleBuyButton = async (item) => {
    if (!user) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để mua hàng.", [{ text: "OK" }]);
      navigation.navigate("Login");
      return;
    }

    try {
      const response = await addToCart(item.IDDoAn, 1);
      if (response?.item) {
        Alert.alert("Thành công", `Đã thêm ${item.Ten} vào giỏ hàng.`, [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      showError("Lỗi", "Không thể thêm vào giỏ hàng.");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getFsBT();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title={foods ? "Danh sách đồ ăn" : foodType.Loai} />
      <FlatList
        data={foodsbyType}
        keyExtractor={(item) => item.IDDoAn.toString()}
        renderItem={({ item }) => (
          <FoodItem item={item} onBuy={handleBuyButton} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
