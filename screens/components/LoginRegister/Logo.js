import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Logo({ uri }) {
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={{ uri }} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
