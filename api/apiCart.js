import API from "./apiConfig";

// API lấy số lượng giỏ hàng
export const getNumberOfCart = async () => {
  try {
    const response = await API.get(`/gio-hang/soluong`);

    return response.data[0].SoLuongDoAnTrongGio;
  } catch (error) {
    // console.error(
    //   "❌ Lỗi khi gọi API lấy số lượng giỏ hàng:",
    //   error.response ? error.response.data : error.message
    // );
    //
    return 0;
  }
};

// API lấy danh sách giỏ hàng
export const getCart = async () => {
  // try {
    const response = await API.get(`/gio-hang`);
    return response.data;
  // } catch (error) {
  //   console.error(
  //     "❌ Lỗi khi gọi API lấy danh sách giỏ hàng:",
  //     error.response ? error.response.data : error.message, error.status
  //   );

  //   return [];
  // }
};

export const addToCart = async (IDDoAn, SoLuong) => {
  try {
    const res = await API.post("/gio-hang/them", {
      IDDoAn,
      SoLuong,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi thêm vào giỏ hàng:", err);

    throw err;
  }
};

export const updateCart = async (IDDoAn, SoLuong) => {
  try {
    const res = await API.put("/gio-hang/sua", {
      IDDoAn,
      SoLuong,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi cập nhật giỏ hàng:", err);

    throw err;
  }
};

export const removeFromCart = async (IDDoAnList) => {
  try {
    const res = await API.delete("/gio-hang/xoa", {
      data: { IDDoAnList },
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi xóa sản phẩm:", err);

    throw err;
  }
};

export const purchaseSelectedItems = async (IDDoAnList, TongTien) => {
  try {
    const res = await API.post("/gio-hang/mua", {
      IDDoAnList,
      TongTien,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi mua hàng:", err);

    throw err;
  }
};
