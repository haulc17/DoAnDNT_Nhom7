import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const ProfileInput = ({ label, value, onChangeText, editable = true, keyboardType = "default" }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginLeft: 5,
  },
  input: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
});

export default ProfileInput;
