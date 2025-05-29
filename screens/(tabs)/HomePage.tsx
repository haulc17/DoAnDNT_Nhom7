import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { getFoods, searchFoods, getFoodsType } from "../../api/apiFoods";
import { getNumberOfCart, addToCart } from "../../api/apiCart";
import { URLServer } from "../../api/apiConfig";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchFood } from "../components/HomePage/SearchFood";
import HeaderHome from "../components/HomePage/HeaderHome";
import FoodHome from "../components/HomePage/FoodHome";
import Banners from "../components/HomePage/Banners";
import HeaderCategoryFoodHome from "../components/HomePage/HeaderCategoryFoodHome";
import CategoryFoodHome from "../components/HomePage/CategoryFoodHome";
import BottomNavbar from "../components/BottomNavbar";
import Loading from "../components/Loading";
import PaginationInfo from "../components/HomePage/PaginationInfo";

import RefreshableScrollView from "../components/RefreshableScrollView";
import showError from "../components/Error";

const banners = [
  `${URLServer}/images/banners/banner1.jpg`,
  `${URLServer}/images/banners/banner2.jpg`,
  `${URLServer}/images/banners/banner3.jpg`,
];

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [foods, setFoods] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [foodsType, setFoodsType] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [numberOfCart, setNumberOfCart] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      };
      getUser();
      loadNumberOfCart();
    }, [])
  );

  const loadNumberOfCart = async () => {
    const numOfCart = await getNumberOfCart();
    setNumberOfCart(numOfCart);
  };

  const loadFoodsData = async (pageToLoad = 1) => {
    if (pageToLoad === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const foodResponse = await getFoods(pageToLoad, 10);
      const allTypes = await getFoodsType();
      loadNumberOfCart();

      setFoods((prev) =>
        pageToLoad === 1 ? foodResponse.data : [...prev, ...foodResponse.data]
      );
      setTotalPages(foodResponse.totalPages);
      setPage(pageToLoad);
      setFoodsType(allTypes);
    } catch (error) {
      showError("Lỗi", "Không thể tải dữ liệu đồ ăn.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadFoodsData(1);
  }, []);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isBottom && !loadingMore && !loading && page < totalPages) {
      loadFoodsData(page + 1);
    }
  };

  const handleSearchText = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchSearchFoods = async () => {
      if (searchText.length > 0) {
        const results = await searchFoods(searchText);
        setFoods(results.data || results);
        setPage(1);
        setTotalPages(1);
      } else {
        // Nếu searchText trống thì load lại trang 1
        loadFoodsData(1);
      }
    };

    fetchSearchFoods();
  }, [searchText]);

  const handleBuyButton = async (item) => {
    if (!user) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để mua hàng.", [{ text: "OK" }]);
      navigation.navigate("Login");
      return;
    }

    try {
      const response = await addToCart(item.IDDoAn, 1);
      loadNumberOfCart();

      if (response?.item) {
        Alert.alert("Thành công", `Đã thêm ${item.Ten} vào giỏ hàng.`, [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      showError("Lỗi", "Không thể thêm vào giỏ hàng.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome user={user} numOfCart={numberOfCart} />
      <SearchFood
        searchText={searchText}
        handleSearchText={handleSearchText}
        foods={foods}
        handleBuyButton={handleBuyButton}
      />
      <RefreshableScrollView
        onRefresh={() => loadFoodsData(1)}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        {searchText.length <= 0 && (
          <View>
            <Banners banners={banners} />
            <HeaderCategoryFoodHome foods={foods} user={user} />
            <CategoryFoodHome foodsType={foodsType} user={user} />
            <FoodHome
              user={user}
              foods={foods}
              handleBuyButton={handleBuyButton}
            />
            <PaginationInfo
              loadingMore={loadingMore}
              page={page}
              totalPages={totalPages}
            />
          </View>
        )}
      </RefreshableScrollView>
      <BottomNavbar user={user} numOfCart={numberOfCart} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});

export default HomePage;
