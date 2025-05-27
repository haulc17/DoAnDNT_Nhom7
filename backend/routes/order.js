const express = require("express");
const sql = require("mssql");
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// API lấy danh sách đơn hàng
// API lấy danh sách đơn hàng có phân trang
router.get("/", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // Đếm tổng số đơn hàng
    const countResult = await sql.query`
      SELECT COUNT(*) AS total FROM DONHANG WHERE TenDangNhap = ${TenDangNhap};
    `;
    const total = countResult.recordset[0].total;

    // Lấy dữ liệu theo trang
    const query = `
      SELECT * FROM DONHANG
      WHERE TenDangNhap = @TenDangNhap
      ORDER BY NgayDat DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `;

    const request = new sql.Request();
    request.input("TenDangNhap", sql.NVarChar, TenDangNhap);
    request.input("offset", sql.Int, offset);
    request.input("limit", sql.Int, limit);
    const result = await request.query(query);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: result.recordset,
    });
  } catch (err) {
    console.error("❌ Lỗi truy vấn phân trang đơn hàng:", err);
    res.status(500).send("Lỗi server");
  }
});


router.get("/chi-tiet-don-hang/:IDDonHang", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;
    const { IDDonHang } = req.params;

    let query = `SELECT DH.IDDonHang, DH.TinhTrangDon, DH.TongTien, DH.NgayDat, 
                  TK.TenDangNhap, TK.HoTen, TK.SDT, TK.DiaChi,
                  D.IDDoAn, D.Ten, D.Gia, DD.SoLuong, D.EncodeAnh
              FROM DONHANG DH
              JOIN TAIKHOAN TK ON DH.TenDangNhap = TK.TenDangNhap
              JOIN DONHANG_DOAN DD ON DH.IDDonHang = DD.IDDonHang
              JOIN DOAN D ON DD.IDDoAn = D.IDDoAn
              WHERE DH.IDDonHang = '${IDDonHang}' AND TK.TenDangNhap = '${TenDangNhap}'`;
    const result = await sql.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Lỗi truy vấn chi tiết đơn hàng", err);
    res.status(500).send("Lỗi server");
  }
});

router.put("/huy", authenticateToken, async (req, res) => {
  const TenDangNhap = req.user.TenDangNhap;
  const { IDDonHang } = req.body;

  try {
    // Cập nhật trạng thái đơn hàng thành "Đã hủy"
    const cancelOrderQuery = `
        UPDATE DONHANG 
        SET TinhTrangDon = N'Đã hủy' 
        WHERE IDDonHang = '${IDDonHang}' AND TenDangNhap = '${TenDangNhap}'
      `;
    await sql.query(cancelOrderQuery);
    res.json({ message: "Hủy đơn hàng thành công", IDDonHang });
  } catch (err) {
    console.error("❌ Lỗi hủy đơn hàng:", err);
    res.status(500).json({ error: "Lỗi server", details: err.message });
  }
});
module.exports = router;
