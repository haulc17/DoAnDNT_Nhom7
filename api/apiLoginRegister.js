import API from "./apiConfig";

// API đăng nhập
export const loginUser = async (TenDangNhap, MatKhau) => {
  try {
    const response = await API.post("/auth/login", { TenDangNhap, MatKhau });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi đăng nhập:", error);
    return null;
  }
};

// API đăng ký
export const registerUser = async (
  TenDangNhap,
  MatKhau,
  HoTen,
  SDT,
  DiaChi
) => {
  try {
    const response = await API.post("/auth/register", {
      TenDangNhap,
      MatKhau,
      HoTen,
      SDT,
      DiaChi,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký:", error);
    return null;
  }
};

// API cập nhật thông tin người dùng
export const updateUserProfile = async (user) => {
  try {
    const response = await API.put("/auth/update-profile", user);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật hồ sơ người dùng:", error);
    return null;
  }
};
