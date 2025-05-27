import React from "react";
import { Text, StyleSheet } from "react-native";

export default function SwitchText({ title, onPress }) {
  return (
    <Text style={styles.switchText} onPress={onPress}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  switchText: {
    color: "#f90",
    marginBottom: 20,
  },
});
