const express = require("express");
const sql = require("mssql");
const router = express.Router();
const jwt = require('jsonwebtoken');

// API Đăng nhập
router.post("/login", async (req, res) => {
  const { TenDangNhap, MatKhau } = req.body;

  if (!TenDangNhap || !MatKhau) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const result = await sql.query`
            SELECT * FROM TAIKHOAN 
            WHERE TenDangNhap = ${TenDangNhap} 
            AND MatKhau = ${MatKhau}
        `;
        
    if (result.recordset.length > 0) {
      // const token = jwt.sign({ TenDangNhap: result.recordset[0].TenDangNhap }, process.env.SECRET_KEY, { expiresIn: '30s' });
      const token = jwt.sign({ TenDangNhap: result.recordset[0].TenDangNhap }, process.env.SECRET_KEY);
      res.json({
        success: true,
        message: "Đăng nhập thành công!",
        user: result.recordset[0],
        token
      });
    } else {
      res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu" });
    }
  } catch (err) {
    console.error("❌ Lỗi truy vấn đăng nhập:", err);
    res.status(500).json({ error: "Lỗi server", details: err.message });
  }
});

// API Đăng ký
router.post("/register", async (req, res) => {
  const { TenDangNhap, MatKhau, HoTen, SDT, DiaChi } = req.body;
  try {
    const checkUser =
      await sql.query`SELECT * FROM TAIKHOAN WHERE TenDangNhap = ${TenDangNhap}`;
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ error: "Tên đăng nhập đã tồn tại!" });
    }
    await sql.query`
            INSERT INTO TAIKHOAN (TenDangNhap, MatKhau, HoTen, SDT, DiaChi)
            VALUES (${TenDangNhap}, ${MatKhau}, ${HoTen}, ${SDT}, ${DiaChi})`;

    await sql.query(
      `INSERT INTO GIOHANG (IDGioHang, TenDangNhap, TongTien) VALUES ('${TenDangNhap}', '${TenDangNhap}', 0)`
    );
    res.json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("❌ Lỗi đăng ký:", err);
    res.status(500).json({ error: "Lỗi server", details: err.message });
  }
});

// 🔹 API Cập nhật thông tin người dùng
router.put("/update-profile", async (req, res) => {
  const { TenDangNhap, HoTen, SDT, DiaChi, MatKhau } = req.body;

  if (!TenDangNhap || !HoTen || !SDT || !DiaChi || !MatKhau) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const result = await sql.query`
        UPDATE TAIKHOAN
        SET HoTen = ${HoTen}, SDT = ${SDT}, DiaChi = ${DiaChi}, MatKhau = ${MatKhau}
        WHERE TenDangNhap = ${TenDangNhap}
      `;

    if (result.rowsAffected[0] > 0) {
      res.json({ success: true, message: "Cập nhật thành công!" });
    } else {
      res.status(400).json({ error: "Không tìm thấy người dùng" });
    }
  } catch (err) {
    console.error("❌ Lỗi cập nhật thông tin tài khoản:", err);
    res.status(500).json({ error: "Lỗi server", details: err.message });
  }
});

module.exports = router;
