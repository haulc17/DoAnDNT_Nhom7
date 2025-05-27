import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const OrderUserInfo = ({ user = {} }) => {
  return (
    <View style={styles.user}>
      <Ionicons name="location" size={20} color="orange" />
      <View>
        {user.IDDonHang && (
          <Text style={styles.userName}>{user.IDDonHang}</Text>
        )}
        <Text style={styles.userName}>{user.HoTen}</Text>
        <Text style={styles.userDetails}>{user.SDT}</Text>
        <Text style={styles.userDetails}>{user.DiaChi}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  userName: { fontSize: 16, fontWeight: "bold" },
  userDetails: { fontSize: 14, color: "gray" },
});

export default OrderUserInfo;
