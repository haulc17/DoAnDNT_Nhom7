import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { URLServer } from "../../../api/apiConfig";
import formatToVND from "../../formatFunction/formatToVND";

const FoodHome = ({ user, foods, handleBuyButton }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.productList}>
      {foods.map((product) => (
        <TouchableOpacity
          key={product.IDDoAn}
          style={styles.productCard}
          onPress={() =>
            navigation.navigate("ProductDetail", { user, product })
          } // Điều hướng
        >
          <Image
            source={{ uri: `${URLServer}/images${product.EncodeAnh}` }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>{product.Ten}</Text>
          <Text style={styles.productPrice}>{formatToVND(product.Gia)}đ</Text>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => handleBuyButton(product)}
          >
            <Text style={styles.buyButtonText}>Thêm vào giở hàng</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 30,
    // height: "1500",
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    width: "49%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productPrice: {
    color: "orange",
    fontSize: 14,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FoodHome;
