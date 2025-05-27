import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CardAccountInfo = ({ URIimg, textContent, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.formCardInfo}
      onPress={handlePress}
    >
      <Image
        style={styles.imageCartInfo}
        source={{
          uri: URIimg,
        }}
      />
      <Text style={styles.fontCardInfo}>{textContent}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  formCardInfo: {
    width: "70%",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 8,
  },
  imageCartInfo: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 10,
  },
  fontCardInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardAccountInfo;
