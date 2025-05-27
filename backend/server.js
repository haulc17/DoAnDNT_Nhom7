require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const path = require("path"); // Để sử dụng express.static

const app = express();
app.use(express.json());
app.use(cors());

// Cấu hình kết nối SQL Server từ .env
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Public folder
// app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Kết nối đến SQL Server
async function connectDB() {
  try {
    await sql.connect(config);
    console.log("✅ Kết nối thành công đến SQL Server!");
  } catch (err) {
    console.error("❌ Lỗi kết nối:", err.message);
    process.exit(1); // Dừng server
  }
}
connectDB();


// --------------------------------------------------------------------------
// API lấy danh sách món ăn
const foodRoutes = require("./routes/foods");
app.use("/do-an", foodRoutes);

// --------------------------------------------------------------------------
// API đăng nhập, đăng ký, cập nhật thông tin tk
const authRoutes = require("./routes/auth")
app.use("/auth", authRoutes)
// ----------------------------------------------------------------------------

const orderRoutes = require("./routes/order")
app.use("/don-hang", orderRoutes)
// ----------------------------------------------------------------------------
// API giỏ hàng
const cartRoutes = require("./routes/cart");
app.use("/gio-hang", cartRoutes);
// ----------------------------------------------------------------------------
// Chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
