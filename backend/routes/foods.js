const express = require("express");
const sql = require("mssql");
const router = express.Router();

// API lấy danh sách món ăn
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // trang hiện tại
    const limit = parseInt(req.query.limit) || 10; // số phần tử mỗi trang
    const offset = (page - 1) * limit;

    const result = await sql.query`
      SELECT * FROM DOAN 
      ORDER BY IDDoAn 
      OFFSET ${offset} ROWS 
      FETCH NEXT ${limit} ROWS ONLY;

      SELECT COUNT(*) AS total FROM DOAN;
    `;

    const foods = result.recordsets[0];
    const total = result.recordsets[1][0].total;

    res.json({
      data: foods,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("❌ Lỗi truy vấn bảng DOAN", err);
    res.status(500).send("Lỗi server");
  }
});


router.get("/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const keyword = name?.trim() || "";
    const result =
      await sql.query`SELECT * FROM DOAN WHERE Ten COLLATE Vietnamese_CI_AI LIKE N'%' + ${keyword} + '%'`;
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Lỗi truy vấn tìm kiếm bảng DOAN:", error);
    res.status(500).json({ error: "Lỗi khi tìm kiếm" });
  }
});

// API lấy 1 đồ ăn theo từng loại
router.get("/type", async (req, res) => {
  try {
    const result = await sql.query`
      SELECT Loai, EncodeAnh
      FROM DOAN D1
      WHERE IDDoAn = (
          SELECT TOP 1 IDDoAn 
          FROM DOAN D2 
          WHERE D1.Loai = D2.Loai
      );`;
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Lỗi truy vấn tìm kiếm loại đồ ăn:", error);
    res.status(500).json({ error: "Lỗi khi tìm kiếm theo loại" });
  }
});

router.get("/search-type/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const result =
      await sql.query`
        SELECT IDDoAn, Ten, Loai, Gia, Mota, EncodeAnh
        FROM DOAN
        WHERE Loai LIKE N'%' + ${type} + '%';
        `;
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Lỗi truy vấn tìm kiếm tất cả đồ ăn theo 1 loại bảng DOAN:", error);
    res.status(500).json({ error: "Lỗi khi tìm kiếm" });
  }
});




module.exports = router;
