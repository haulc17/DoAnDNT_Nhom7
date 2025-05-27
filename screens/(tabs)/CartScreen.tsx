import React, { useEffect, useState, useMemo, useCallback } from "react";
//import { KeyboardAvoidingView, Platform } from "react-native";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCart, updateCart, removeFromCart } from "../../api/apiCart";
import {BackHeader2} from "../components/BackHeader";
import Loading from "../components/Loading";
import SelectAllHeader from "../components/CartScreen/SelectAllHeader";
import CartItemCpn from "../components/CartScreen/CartItemCpn";
import CartFooter from "../components/CartScreen/CartFooter";
import { URLServer } from "../../api/apiConfig";
import { handleTokenExpired } from "../../api/handleTokenExpired";
import showError from "../components/Error";

interface CartItem {
  IDDoAn: string;
  TenDoAn: string;
  Gia: number;
  SoLuong: number;
  EncodeAnh: string;
  selected: boolean;
}

const CartScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          navigation.navigate("Login");
        }
      };
      getUser();
    }, [])
  );

  const fetchCart = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getCart();
      // Đảm bảo mỗi item có `selected` mặc định
      const cartWithSelection = data.map((item: CartItem) => ({
        ...item,
        selected: item.selected ?? false, // Nếu `selected` chưa có, đặt mặc định là `false`
      }));
      setCartItems(cartWithSelection);
    } catch (error) {
      if (error.response?.status === 403) {
        await handleTokenExpired(navigation);
      } else {
        showError("Lỗi", "Lỗi khi lấy dữ liệu giỏ hàng.");
      }
      console.error(
        "❌ Lỗi khi gọi API lấy danh sách giỏ hàng:",
        error.response ? error.response.data : error.message,
        error.status
      );
      
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [user]); // Chạy lại khi user thay đổi

  if (loading) {
    return <Loading />; // Hiển thị Loading khi đang tải dữ liệu
  }

  const updateQuantity = async (IDDoAn: string, change: number) => {
    const updatedItems = cartItems.map((item) =>
      item.IDDoAn === IDDoAn
        ? { ...item, SoLuong: Math.max(1, item.SoLuong + change) }
        : item
    );
    setCartItems(updatedItems);

    try {
      await updateCart(
        IDDoAn,
        updatedItems.find((item) => item.IDDoAn === IDDoAn)?.SoLuong || 1
      );
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
      showError("Lỗi", "Lỗi cập nhật số lượng sản phẩm trong giỏ hàng.");
    }
  };

  const removeItem = async (IDDoAn: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.IDDoAn !== IDDoAn)
    );

    try {
      await removeFromCart([IDDoAn]);
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      showError("Lỗi", "Lỗi xóa sản phẩm trong giỏ hàng.");
    }
  };

  const removeSelectedItems = async () => {
    const selectedIDs = cartItems
      .filter((item) => item.selected)
      .map((item) => item.IDDoAn);
    if (selectedIDs.length === 0) return;

    try {
      await removeFromCart(selectedIDs);
      setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      showError("Lỗi", "Lỗi xóa sản phẩm trong giỏ hàng.");
    }
  };

  const toggleItemSelection = (IDDoAn: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.IDDoAn === IDDoAn ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const isAllSelected = cartItems.every((item) => item.selected);
  const toggleSelectAll = () => {
    const newSelectedState = !isAllSelected;
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: newSelectedState }))
    );
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalFoodsAmount = selectedItems.reduce(
    (sum, item) => sum + item.Gia * item.SoLuong,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader2 title={"Giỏ hàng của tôi"} />

      <SelectAllHeader
        isAllSelected={isAllSelected}
        toggleSelectAll={toggleSelectAll}
        removeSelectedItems={removeSelectedItems}
      />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.IDDoAn.toString()}
        refreshing={loading}
        onRefresh={fetchCart}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>Giỏ hàng trống!</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <CartItemCpn
            item={item}
            toggleItemSelection={toggleItemSelection}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            URLServer={URLServer}
          />
        )}
      />

      <CartFooter
        totalFoodsAmount={totalFoodsAmount}
        selectedItems={selectedItems}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
});
