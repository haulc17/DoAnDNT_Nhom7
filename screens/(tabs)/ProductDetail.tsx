import React from "react";
import { Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import RefreshableScrollView from "../components/RefreshableScrollView";
import BackHeader from "../components/BackHeader";
import ProductImage from "../components/ProductDetail/ProductImage";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import AddToCartButton from "../components/ProductDetail/AddToCartButton";

import { addToCart } from "../../api/apiCart";
import showError from "../components/Error";

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, product } = route.params;

  const handleBuyButton = async () => {
    if (!user) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để mua hàng.", [{ text: "OK" }]);
      navigation.navigate("Login");
      return;
    }

    try {
      const response = await addToCart( product.IDDoAn, 1);
      if (response?.item) {
        Alert.alert("Thành công", `Đã thêm ${product.Ten} vào giỏ hàng.`, [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      // Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng.", [{ text: "OK" }]);
      showError("Lỗi", "Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <RefreshableScrollView onRefresh={() => {}} style={{}}>
        <BackHeader title="Chi tiết sản phẩm" />
        <ProductImage encodeAnh={product.EncodeAnh} />
        <ProductInfo product={product} />
        <AddToCartButton onPress={handleBuyButton} />
      </RefreshableScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
