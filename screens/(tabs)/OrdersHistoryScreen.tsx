// import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../components/BackHeader";
import { BackHeaderToHome } from "../components/BackHeader";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrdersHistory } from "../../api/apiOrdersHistory";
import OrderItem from "../components/OrderHistory/OrderItem";
import Pagination from "../components/OrderHistory/Pagination";
import showError from "../components/Error";

const OrderHistoryScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      };
      getUser();
    }, [])
  );

  const fetchOrders = async (currentPage = page) => {
    if (!user) return;
    try {
      setLoading(true);
      const result = await getOrdersHistory(currentPage, limit);
      setOrders(result.data);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
      showError("Lỗi khi tải đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [user, page]);

  const getPageNumbers = () => {
    const maxDisplayedPages = 5;
    const pages = [];

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, page + 2);

      if (page <= 3) {
        endPage = 5;
      } else if (page >= totalPages - 2) {
        startPage = totalPages - 4;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.app}>
      <BackHeaderToHome title={"Lịch sử đơn hàng"} />
      <View style={styles.container}>
        {/* {orders.length > 0 && ( */}
        <FlatList
          data={orders}
          keyExtractor={(item) => item.IDDonHang}
          renderItem={({ item }) => <OrderItem item={item} />}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={fetchOrders}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text>Bạn chưa có đơn hàng nào!</Text>
            </View>
          )}
        />
        {/* )} */}
      </View>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        getPageNumbers={getPageNumbers}
      />
    </SafeAreaView>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Đã giao":
      return { color: "green" };
    case "Đang xử lý":
      return { color: "orange" };
    case "Đã hủy":
      return { color: "red" };
    default:
      return { color: "black" };
  }
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  orderTotal: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
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
});

export default OrderHistoryScreen;
