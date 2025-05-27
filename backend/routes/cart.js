const express = require("express");
const sql = require("mssql");
const router = express.Router();
const authenticateToken = require('../middleware/auth');

//api lấy số lượng đồ ăn trong giỏ hàng
router.get("/soluong", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;

    const query = `
      SELECT COUNT(DISTINCT GD.IDDoAn) AS SoLuongDoAnTrongGio
      FROM GIOHANG G
      JOIN GIOHANG_DOAN GD ON G.IDGioHang = GD.IDGioHang
      WHERE G.TenDangNhap = '${TenDangNhap}'
    `;

    const result = await sql.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Lỗi lấy số lượng bảng GIOHANG", err);
    res.status(500).send("Lỗi server");
  }
});


// API lấy danh sách giỏ hàng
router.get("/", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;

    let query = 
        `SELECT 
          GH.IDGioHang,
          DA.IDDoAn,
          DA.Ten AS TenDoAn,
          DA.Loai,
          DA.Gia,
          DA.Mota,
          DA.EncodeAnh,
          GD.SoLuong,
          (DA.Gia * GD.SoLuong) AS ThanhTien
        FROM GIOHANG GH
        JOIN GIOHANG_DOAN GD ON GH.IDGioHang = GD.IDGioHang
        JOIN DOAN DA ON GD.IDDoAn = DA.IDDoAn
        WHERE GH.TenDangNhap = '${TenDangNhap}'`;
    const result = await sql.query(query);
    // console.log(result.recordset)
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Lỗi truy vấn bảng GIOHANG", err);
    res.status(500).send("Lỗi server");
  }
});

// API thêm sản phẩm vào giỏ hàng
router.post("/them", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;
    const { IDDoAn, SoLuong } = req.body;

    if (!TenDangNhap || !IDDoAn || !SoLuong) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    // Kiểm tra giỏ hàng có tồn tại chưa
    let checkCartQuery = `SELECT IDGioHang FROM GIOHANG WHERE TenDangNhap = '${TenDangNhap}'`;
    let cartResult = await sql.query(checkCartQuery);
    let IDGioHang = cartResult.recordset[0].IDGioHang;

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    let checkItemQuery = `SELECT SoLuong FROM GIOHANG_DOAN WHERE IDGioHang = '${IDGioHang}' AND IDDoAn = '${IDDoAn}'`;
    let itemResult = await sql.query(checkItemQuery);

    if (itemResult.recordset.length > 0) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      let newQuantity = itemResult.recordset[0].SoLuong + SoLuong;
      let updateQuery = `UPDATE GIOHANG_DOAN SET SoLuong = ${newQuantity} WHERE IDGioHang = '${IDGioHang}' AND IDDoAn = '${IDDoAn}'`;
      await sql.query(updateQuery);
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
      let insertQuery = `INSERT INTO GIOHANG_DOAN (IDGioHang, IDDoAn, SoLuong) VALUES ('${IDGioHang}', '${IDDoAn}', ${SoLuong})`;
      await sql.query(insertQuery);
    }

    res.json({
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      item: {},
    });
  } catch (err) {
    console.error("❌ Lỗi thêm vào giỏ hàng:", err);
    res
      .status(500)
      .json({ error: "Lỗi server khi thêm sản phẩm vào giỏ hàng" });
  }
});

// API cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/sua", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;
    const { IDDoAn, SoLuong } = req.body;


    let query = `
            UPDATE GD 
            SET SoLuong = ${SoLuong}
            FROM GIOHANG_DOAN GD
            JOIN GIOHANG GH ON GD.IDGioHang = GH.IDGioHang
            WHERE GH.TenDangNhap = '${TenDangNhap}' AND GD.IDDoAn = '${IDDoAn}'
        `;

    await sql.query(query);
    res.send({ message: "Cập nhật số lượng thành công" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật giỏ hàng:", err);
    res.status(500).send("Lỗi server");
  }
});

// API cho phép xóa nhiều sản phẩm khỏi giỏ hàng
router.delete("/xoa", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;
    const { IDDoAnList } = req.body; // Nhận danh sách sản phẩm cần xóa

    if (!Array.isArray(IDDoAnList) || IDDoAnList.length === 0) {
      return res
        .status(400)
        .send({ message: "Danh sách sản phẩm cần xóa không hợp lệ" });
    }

    let query = `
            DELETE GD 
            FROM GIOHANG_DOAN GD
            JOIN GIOHANG GH ON GD.IDGioHang = GH.IDGioHang
            WHERE GH.TenDangNhap = '${TenDangNhap}' AND GD.IDDoAn IN (${IDDoAnList.map(
      (id) => `'${id}'`
    ).join(",")})
        `;

    await sql.query(query);
    res.send({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    console.error("❌ Lỗi xóa sản phẩm:", err);
    res.status(500).send("Lỗi server");
  }
});

// API mua hàng
router.post("/mua", authenticateToken, async (req, res) => {
  try {
    const TenDangNhap = req.user.TenDangNhap;
    const { IDDoAnList, TongTien } = req.body;

    if (!Array.isArray(IDDoAnList) || IDDoAnList.length === 0) {
      return res
        .status(400)
        .send({ message: "Danh sách sản phẩm mua không hợp lệ" });
    }

    const IDDonHang = `DH_${Date.now()}`; // Tạo ID đơn hàng
    const NgayDat = new Date().toISOString().slice(0, 19).replace("T", " ");

    // // Tính tổng tiền đơn hàng
    // const totalQuery = `
    //     SELECT SUM(D.Gia * GD.SoLuong) AS TongTien
    //     FROM GIOHANG_DOAN GD
    //     JOIN DOAN D ON GD.IDDoAn = D.IDDoAn
    //     JOIN GIOHANG GH ON GD.IDGioHang = GH.IDGioHang
    //     WHERE GH.TenDangNhap = '${TenDangNhap}' AND GD.IDDoAn IN (${IDDoAnList.map(id => `'${id}'`).join(",")})
    // `;
    // const totalResult = await sql.query(totalQuery);
    // const TongTien = totalResult[0]?.TongTien || 0;

    // Thêm vào đơn hàng
    await sql.query(`
            INSERT INTO DONHANG (IDDonHang, TinhTrangDon, TongTien, TenDangNhap, NgayDat) 
            VALUES ('${IDDonHang}', N'Đang xử lý', ${TongTien}, '${TenDangNhap}', '${NgayDat}')
        `);

    // Thêm các món ăn vào đơn hàng
    await sql.query(`
            INSERT INTO DONHANG_DOAN (IDDonHang, IDDoAn, SoLuong)
            SELECT '${IDDonHang}', GD.IDDoAn, GD.SoLuong
            FROM GIOHANG_DOAN GD
            JOIN GIOHANG GH ON GD.IDGioHang = GH.IDGioHang
            WHERE GH.TenDangNhap = '${TenDangNhap}' AND GD.IDDoAn IN (${IDDoAnList.map(
      (id) => `'${id}'`
    ).join(",")})
        `);

    // Xóa các món ăn đã mua khỏi giỏ hàng
    await sql.query(`
            DELETE GD 
            FROM GIOHANG_DOAN GD
            JOIN GIOHANG GH ON GD.IDGioHang = GH.IDGioHang
            WHERE GH.TenDangNhap = '${TenDangNhap}' AND GD.IDDoAn IN (${IDDoAnList.map(
      (id) => `'${id}'`
    ).join(",")})
        `);

    res.send({ message: "Mua hàng thành công", IDDonHang });
  } catch (err) {
    console.error("❌ Lỗi mua hàng:", err);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;
