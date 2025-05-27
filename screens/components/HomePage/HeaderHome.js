import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { URLServer } from "../../../api/apiConfig";

const HeaderHome = ({ user, numOfCart }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerHomeIcon}>
        <Image
          source={{ uri: `${URLServer}/images/homePage/homeIcon.png` }}
          style={styles.iconImage}
        />
      </View>
      <View style={styles.headerHomeUserCart}>
        <TouchableOpacity
          onPress={() =>
            user
              ? navigation.navigate("AccountSetting")
              : navigation.navigate("Login")
          }
        >
          <Image
            source={{ uri: `${URLServer}/images/homePage/accountIcon.jpg` }}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            user ? navigation.navigate("CartScreen") : navigation.navigate("Login")
          }
        >
          <Image
            source={{ uri: `${URLServer}/images/homePage/cartIcon.jpg` }}
            style={styles.iconImage}
          />
          <View style={styles.cartquantityContainer}>
            <Text style={styles.cartquantityText} >{numOfCart}</Text> 
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
  },
  headerHomeIcon: {
    flex: 1,
  },
  headerHomeUserCart: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  cartquantityContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "orange",
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartquantityText: {
    color: "#fff",
  },
});

export default HeaderHome;
