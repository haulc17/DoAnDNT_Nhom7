import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackHeader from "../components/BackHeader";
import { getFoodsByType } from "../../api/apiFoods";
import { addToCart } from "../../api/apiCart";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import FoodItem from "../components/Category/FoodItem";
import showError from "../components/Error";

const Category = () => {
  const [foodsbyType, setFoodsbyType] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 10;

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
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      showError("Lỗi", "Lỗi khi lấy dữ liệu đồ ăn theo loại.");
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

  const handleLoadMore = () => {
    if (loadingMore) return;
    const totalItems = foodsbyType.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      setLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (loadingMore) {
      setLoadingMore(false);
    }
  }, [currentPage]);

  const paginatedData = foodsbyType.slice(0, currentPage * itemsPerPage);

  // Component hiển thị footer khi đang load thêm
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <Text>Đang tải thêm...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title={foods ? "Danh sách đồ ăn" : foodType.Loai} />
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.IDDoAn.toString()}
        renderItem={({ item }) => (
          <FoodItem item={item} onBuy={handleBuyButton} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    padding: 10,
    alignItems: "center",
  },
});
