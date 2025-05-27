import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";

const SelectAllHeader = ({
  isAllSelected,
  toggleSelectAll,
  removeSelectedItems,
}) => {
  return (
    <View style={styles.selectAllContainer}>
      <TouchableOpacity onPress={toggleSelectAll}>
        <View style={styles.selectAllLeft}>
          <Checkbox
            value={isAllSelected}
            onValueChange={toggleSelectAll}
            color="orange"
          />
          <Text style={styles.selectAllText}>Chọn tất cả</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeSelectedItems}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default SelectAllHeader;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  selectAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  selectAllLeft: { flexDirection: "row", alignItems: "center" },
  selectAllText: { fontSize: 16, marginLeft: 10 },
});
