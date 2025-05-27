import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { URLServer } from "../../../api/apiConfig";
import formatToVND from "../../formatFunction/formatToVND";

const SearchFood = ({ searchText, handleSearchText, foods, handleBuyButton }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm sản phẩm..."
        value={searchText}
        onChangeText={handleSearchText}
      />

      {searchText.length > 0 && (
        <View>
          {foods.map((item) => (
            <View key={item.IDDoAn} style={styles.foodItemContainer}>
              <Image
                source={{ uri: `${URLServer}/images${item.EncodeAnh}` }}
                style={styles.foodImage}
              />
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.Ten}</Text>
                <Text style={styles.foodType}>{item.Loai}</Text>
                <Text style={styles.foodPrice}>
                  {formatToVND(item.Gia)}đ
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => handleBuyButton(item)}
              >
                <Text style={styles.buyButtonText}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  foodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodType: {
    color: "gray",
  },
  foodPrice: {
    color: "orange",
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

export { SearchFood };
