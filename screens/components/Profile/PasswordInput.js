import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = ({ value, onChangeText, secureText, setSecureText }) => {
  return (
    <View>
      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          secureTextEntry={secureText}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureText(!secureText)}
        >
          <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginLeft: 5,
  },
  container: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default PasswordInput;
