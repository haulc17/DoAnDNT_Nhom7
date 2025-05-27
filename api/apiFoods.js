import API from "./apiConfig";

// API lấy danh sách đồ ăn
export const getFoods = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`/do-an?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API: Lấy danh sách đồ ăn", error);
    return { data: [], totalPages: 1 };
  }
};


export const searchFoods = async (name) => {
  try {
    const response = await API.get(`/do-an/search/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm đồ ăn:", error);
    return [];
  }
};

export const getFoodsType = async () => {
  try {
    const response = await API.get("/do-an/type");
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi gọi API: Lấy danh sách đồ ăn theo từng loại",
      error
    );

    return [];
  }
};

export const getFoodsByType = async (type) => {
  try {
    const response = await API.get(
      `/do-an/search-type/${encodeURIComponent(type)}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi gọi API: Lấy danh sách tất cả đồ ăn theo 1 loại",
      error
    );
    return [];
  }
};
export default API;
