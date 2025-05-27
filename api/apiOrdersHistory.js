import API from "./apiConfig";

// API lấy danh sách đơn hàng
export const getOrdersHistory = async (page = 1, limit = 5) => {
  try {
    const response = await API.get(`/don-hang?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API: Đơn hàng", error.response ? error.response.data : error.message);
    return { data: [], total: 0, page: 1, totalPages: 1 };
  }
};
  

// API lấy chi tiết đơn hàng theo ID
export const getOrderDetail = async (IDDonHang) => {
  try {
    const response = await API.get(`/don-hang/chi-tiet-don-hang/${IDDonHang}`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi gọi API: Chi tiết đơn hàng",
      error.response ? error.response.data : error.message
    );

    return [];
  }
};

export const cancelOrder = async (IDDonHang) => {
  try {
    const response = await API.put("/don-hang/huy", {
      IDDonHang,
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error(
      "❌ Lỗi khi gọi API hủy đơn hàng:",
      error.response ? error.response.data : error.message
    );

    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
