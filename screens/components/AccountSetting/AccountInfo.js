import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { URLServer } from "../../../api/apiConfig";

const AccountInfo = ({ user }) => {
  return (
    <View style={styles.containerAccountInfo}>
      <Image
        source={{
          uri: `${URLServer}/images/accountSetting/accountIcon.jpg`,
        }}
        style={styles.imageAccountInfo}
      />
      <View style={styles.contentAccountInfo}>
        <Text style={styles.nameContentAccountInfo}>{user?.HoTen}</Text>
        <Text style={styles.phoneContentAccountInfo}>{user?.SDT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerAccountInfo: {
    width: "70%",
    borderWidth: 0.1,
    borderColor: "#ccc",
    flexDirection: "row",
    marginHorizontal: "auto",
    padding: 10,
    marginTop: 20,
    borderRadius: 3,
  },
  imageAccountInfo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  contentAccountInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  nameContentAccountInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneContentAccountInfo: {
    color: "gray",
  },
});

export default AccountInfo;
