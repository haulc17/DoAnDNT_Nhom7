import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { URLServer } from "../../api/apiConfig";

const BottomNavbar = ({ user, numOfCart }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* HOME */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          source={{ uri: `${URLServer}/images/homePage/homeIcon.png` }}
          style={styles.icon}
        />
        <Text style={styles.label}>Trang chủ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => user ? navigation.navigate("OrdersHistoryScreen"): navigation.navigate("Login")}
      >
        <Image
          source={{ uri: `${URLServer}/images/homePage/orderIcon.jpg` }}
          style={styles.icon}
        />
        <Text style={styles.label}>Đơn hàng</Text>
      </TouchableOpacity>

      {/* ACCOUNT */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() =>
          user ? navigation.navigate("AccountSetting") : navigation.navigate("Login")
        }
      >
        <Image
          source={{ uri: `${URLServer}/images/homePage/accountIcon.jpg` }}
          style={styles.icon}
        />
        <Text style={styles.label}>Tài khoản</Text>
      </TouchableOpacity>

      {/* CART */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() =>
          user ? navigation.navigate("CartScreen") : navigation.navigate("Login")
        }
      >
        <Image
          source={{ uri: `${URLServer}/images/homePage/cartIcon.jpg` }}
          style={styles.icon}
        />
        {numOfCart > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{numOfCart}</Text>
          </View>
        )}
        <Text style={styles.label}>Giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "orange",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default BottomNavbar;
