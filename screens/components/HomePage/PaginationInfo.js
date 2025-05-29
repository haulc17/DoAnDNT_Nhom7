import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Loading from "../Loading";

const PaginationInfo = ({ loadingMore, page, totalPages }) => {
  return (
    <View style={styles.wrapper}>
      {!loadingMore && page < totalPages && (
        <View>
          <Loading />
          <Text style={styles.loadingText}>Đang tải thêm...</Text>
        </View>
      )}
      {!loadingMore && page >= totalPages && (
        <Text style={styles.doneText}>Đã hiển thị tất cả món ăn.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 60,
  },
  loadingText: {
    textAlign: "center",
    padding: 10,
  },
  doneText: {
    textAlign: "center",
    padding: 10,
    color: "gray",
    marginBottom: 10,
  },
});

export default PaginationInfo;
