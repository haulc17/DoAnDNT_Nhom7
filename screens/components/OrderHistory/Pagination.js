import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ page, totalPages, onPageChange, getPageNumbers }) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        disabled={page === 1}
        onPress={() => onPageChange(1)}
        style={[styles.pageButton, page === 1 && styles.disabledButton]}
      >
        <Text style={styles.pageText}>{`<<`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={page === 1}
        onPress={() => onPageChange(page - 1)}
        style={[styles.pageButton, page === 1 && styles.disabledButton]}
      >
        <Text style={styles.pageText}>{`<`}</Text>
      </TouchableOpacity>

      {getPageNumbers().map((p) => (
        <TouchableOpacity
          key={p}
          onPress={() => onPageChange(p)}
          style={[
            styles.pageButton,
            page === p && styles.activePageButton,
          ]}
        >
          <Text
            style={[
              styles.pageText,
              page === p && styles.activePageText,
            ]}
          >
            {p}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={page === totalPages}
        onPress={() => onPageChange(page + 1)}
        style={[
          styles.pageButton,
          page === totalPages && styles.disabledButton,
        ]}
      >
        <Text style={styles.pageText}>{`>`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={page === totalPages}
        onPress={() => onPageChange(totalPages)}
        style={[
          styles.pageButton,
          page === totalPages && styles.disabledButton,
        ]}
      >
        <Text style={styles.pageText}>{`>>`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  pageText: {
    color: "#333",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#eee",
  },
  activePageButton: {
    backgroundColor: "orange",
  },
  activePageText: {
    color: "white",
  },
});

export default Pagination;
