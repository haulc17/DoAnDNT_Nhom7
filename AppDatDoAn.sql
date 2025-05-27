CREATE DATABASE AppDatDoAn
USE AppDatDoAn

CREATE TABLE TAIKHOAN(
	TenDangNhap VARCHAR(20) constraint PK_TAIKHOAN primary key,
	MatKhau VARCHAR(20),
	HoTen NVARCHAR(20),
	SDT CHAR(10),
	DiaChi NVARCHAR(30)
)

CREATE TABLE GIOHANG(
	IDGioHang VARCHAR(20) constraint PK_GIOHANG primary key,
	TenDangNhap VARCHAR(20),
	TongTien FLOAT
)

CREATE TABLE DONHANG(
	IDDonHang VARCHAR(20) constraint PK_DONHANG primary key,
	TinhTrangDon NVARCHAR(20),
	TongTien FLOAT,
	TenDangNhap VARCHAR(20),
	NgayDat DATETIME
)

CREATE TABLE DOAN(
	IDDoAn VARCHAR(20) constraint PK_DOAN primary key,
	Ten NVARCHAR(20),
	Loai NVARCHAR(20),
	Gia FLOAT,
	Mota NVARCHAR(100),
	EncodeAnh VARCHAR(100) unique,
)

CREATE TABLE DONHANG_DOAN(
	IDDonHang VARCHAR(20),
	IDDoAn VARCHAR(20),
	SoLuong INT,
	constraint PK_DONHANG_DOAN primary key(IDDonHang, IDDoAn)
)

CREATE TABLE GIOHANG_DOAN(
	IDGioHang VARCHAR(20),
	IDDoAn VARCHAR(20),
	SoLuong INT
	constraint PK_GIOHANG_DOAN primary key(IDGioHang, IDDoAn)
)

--ALTER TABLE GIOHANG
--ADD CONSTRAINT FK_GIOHANG_TAIKHOAN foreign key (TenDangNhap) references TAIKHOAN(TenDangNhap)

--ALTER TABLE DONHANG
--ADD CONSTRAINT FK_DONHANG_TAIKHOAN foreign key(TenDangNhap) references TAIKHOAN(TenDangNhap)
	
--ALTER TABLE DONHANG_DOAN
--ADD CONSTRAINT FK_DONHANG_DONHANGDOAN foreign key(IDDonHang) references DONHANG(IDDonHang),
--	CONSTRAINT FK_DOAN_DONHANGDOAN foreign key(IDDoAn) references DOAN(IDDoAn)

--ALTER TABLE GIOHANG_DOAN
--ADD CONSTRAINT FK_GIOHANG_GIOHANGDOAN foreign key(IDGioHang) references GIOHANG(IDGioHang),
--	CONSTRAINT FK_DOAN_GIOHANGDOAN foreign key(IDDoAn) references DOAN(IDDoAn)


-- Thêm tài khoản người dùng
INSERT INTO TAIKHOAN (TenDangNhap, MatKhau, HoTen, SDT, DiaChi) VALUES
('user01', 'password123', N'Nguyễn Văn A', '0987654321', N'123 Đường A, Hà Nội'),
('user02', 'pass456', N'Trần Thị B', '0912345678', N'456 Đường B, TP HCM'),
('user03', 'abcde789', N'Phạm Văn C', '0909123456', N'789 Đường C, Đà Nẵng');
SELECT * FROM TAIKHOAN

-- Thêm giỏ hàng (tạm để tổng tiền là 0, sẽ cập nhật sau)
INSERT INTO GIOHANG (IDGioHang, TenDangNhap, TongTien) VALUES
('GH001', 'user01', 0),
('GH002', 'user02', 0),
('GH003', 'user03', 0);
SELECT * FROM GIOHANG

-- Thêm món ăn vào menu
INSERT INTO DOAN (IDDoAn, Ten, Loai, Gia, Mota, EncodeAnh) VALUES
('DA001', N'Bánh mì', N'Đồ ăn', 25000, N'Bánh mì thịt nướng với rau', '/foods/DA001BanhMi.jpg'),
('DA002', N'Phở bò', N'Đồ ăn', 40000, N'Phở bò truyền thống', '/foods/DA002PhoBo.jpg'),
('DA003', N'Bún chả', N'Đồ ăn',35000, N'Bún chả Hà Nội', '/foods/DA003BunCha.jpg'),
('DA004', N'Cơm gà', N'Đồ ăn',50000, N'Cơm gà xối mỡ', '/foods/DA004ComGa.jpg'),
('DA005', N'Trà sữa', N'Nước uống', 30000, N'Trà sữa trân châu đường đen', '/foods/DA005TraSua.jpg'),
('DA006', N'Bánh cuốn', N'Đồ ăn', 30000, N'Bánh cuốn Thanh Trì mềm mịn', '/foods/DA006BanhCuon.jpg'),
('DA007', N'Nước ngọt', N'Nước uống', 15000, N'Nước ngọt có gas tươi mát', '/foods/DA007NuocNgot.jpg'),
('DA008', N'Nước suối', N'Nước uống', 10000, N'Nước khoáng tinh khiết', '/foods/DA008NuocSuoi.jpg'),
('DA009', N'Chè bưởi', N'Tráng miệng', 25000, N'Chè bưởi ngọt thanh, dai giòn', '/foods/DA009CheBuoi.jpg'),
('DA010', N'Bánh flan', N'Tráng miệng', 20000, N'Bánh flan mềm mịn, béo ngậy', '/foods/DA010BanhFlan.jpg'),
('DA011', N'Hamburger', N'Đồ ăn nhanh', 40000, N'Hamburger bò nướng kiểu Mỹ', '/foods/DA011Hamburger.jpg'),
('DA012', N'Khoai tây chiên', N'Đồ ăn nhanh', 25000, N'Khoai tây chiên giòn tan', '/foods/DA012KhoaiTayChien.jpg'),
('DA013', N'Sinh tố xoài', N'Sinh tố', 35000, N'Sinh tố xoài chín tươi ngon', '/foods/DA013SinhToXoai.jpg'),
('DA014', N'Cà phê sữa đá', N'Cà phê', 25000, N'Cà phê sữa đá đậm đà', '/foods/DA014CaPheSuaDa.jpg'),
('DA015', N'Nước ép cam', N'Nước ép', 30000, N'Nước ép cam tươi mát', '/foods/DA015NuocEpCam.jpg'),
('DA016', N'Nước ép cà rốt', N'Nước ép', 28000, N'Nước ép cà rốt giàu vitamin A', '/foods/DA016NuocEpCaRot.jpg');
SELECT * FROM DOAN


-- Thêm sản phẩm vào giỏ hàng
INSERT INTO GIOHANG_DOAN (IDGioHang, IDDoAn, SoLuong) VALUES
('GH001', 'DA001', 2),  -- User01 mua 2 bánh mì
('GH001', 'DA003', 1),  -- User01 mua 1 bún chả
('GH002', 'DA002', 1),  -- User02 mua 1 phở bò
('GH002', 'DA004', 2),  -- User02 mua 2 cơm gà
('GH003', 'DA005', 3);  -- User03 mua 3 trà sữa
SELECT * FROM GIOHANG_DOAN

-- Cập nhật tổng tiền giỏ hàng (giá trị này tính từ số lượng và đơn giá)
UPDATE GIOHANG SET TongTien = 
    (SELECT SUM(D.Gia * GD.SoLuong) 
     FROM GIOHANG_DOAN GD 
     JOIN DOAN D ON GD.IDDoAn = D.IDDoAn 
     WHERE GD.IDGioHang = 'GH001')
WHERE IDGioHang = 'GH001';

UPDATE GIOHANG SET TongTien = 
    (SELECT SUM(D.Gia * GD.SoLuong) 
     FROM GIOHANG_DOAN GD 
     JOIN DOAN D ON GD.IDDoAn = D.IDDoAn 
     WHERE GD.IDGioHang = 'GH002')
WHERE IDGioHang = 'GH002';

UPDATE GIOHANG SET TongTien = 
    (SELECT SUM(D.Gia * GD.SoLuong) 
     FROM GIOHANG_DOAN GD 
     JOIN DOAN D ON GD.IDDoAn = D.IDDoAn 
     WHERE GD.IDGioHang = 'GH003')
WHERE IDGioHang = 'GH003';

-- Thêm đơn hàng (tạm để trạng thái "Chờ xác nhận")
INSERT INTO DONHANG (IDDonHang, TinhTrangDon, TongTien, TenDangNhap, NgayDat) VALUES
('DH001', N'Chờ xác nhận', 85000, 'user01', '2025-03-24 14:30:00'),
('DH002', N'Đã giao', 140000, 'user02', '2025-03-22 16:30:00'),
('DH003', N'Đang giao', 90000, 'user03', '2025-02-21 8:30:00'),
('DH004', N'Chờ xác nhận', 85000, 'user01', '2025-03-27 4:30:00'),
('DH005', N'Đã giao', 140000, 'user01', '2025-03-22 16:30:00');
SELECT * FROM DONHANG

-- Thêm món ăn vào đơn hàng
INSERT INTO DONHANG_DOAN (IDDonHang, IDDoAn, SoLuong) VALUES
('DH001', 'DA001', 2),  -- Đơn hàng 1 có 2 bánh mì
('DH001', 'DA003', 1),  -- Đơn hàng 1 có 1 bún chả
('DH002', 'DA002', 1),  -- Đơn hàng 2 có 1 phở bò
('DH002', 'DA004', 2),  -- Đơn hàng 2 có 2 cơm gà
('DH003', 'DA005', 3),  -- Đơn hàng 3 có 3 trà sữa
('DH004', 'DA001', 2),  -- Đơn hàng 1 có 2 bánh mì
('DH004', 'DA003', 1),  -- Đơn hàng 1 có 1 bún chả
('DH005', 'DA002', 1),  -- Đơn hàng 2 có 1 phở bò
('DH005', 'DA004', 2);  -- Đơn hàng 2 có 2 cơm gà
SELECT * FROM DONHANG_DOAN

SELECT * FROM TAIKHOAN
SELECT * FROM GIOHANG
SELECT * FROM GIOHANG_DOAN
SELECT * FROM DOAN
SELECT * FROM DONHANG
SELECT * FROM DONHANG_DOAN

--SELECT * FROM DONHANG 
--WHERE TenDangNhap = 'user01'

--SELECT DH.IDDonHang, DH.TinhTrangDon, DH.TongTien, DH.NgayDat, 
--       TK.TenDangNhap, TK.HoTen, TK.SDT, TK.DiaChi,
--       D.Ten, D.Gia, DD.SoLuong, D.EncodeAnh
--FROM DONHANG DH
--JOIN TAIKHOAN TK ON DH.TenDangNhap = TK.TenDangNhap
--JOIN DONHANG_DOAN DD ON DH.IDDonHang = DD.IDDonHang
--JOIN DOAN D ON DD.IDDoAn = D.IDDoAn
--WHERE DH.IDDonHang = 'DH001';

--SELECT 
--    GH.IDGioHang,
--    DA.IDDoAn,
--    DA.Ten AS TenDoAn,
--    DA.Loai,
--    DA.Gia,
--    DA.Mota,
--    DA.EncodeAnh,
--    GD.SoLuong,
--    (DA.Gia * GD.SoLuong) AS ThanhTien
--FROM GIOHANG GH
--JOIN GIOHANG_DOAN GD ON GH.IDGioHang = GD.IDGioHang
--JOIN DOAN DA ON GD.IDDoAn = DA.IDDoAn
--WHERE GH.TenDangNhap = 'user01';

--SELECT IDDoAn, Ten, Loai, Gia, Mota, EncodeAnh
--FROM DOAN D1
--WHERE IDDoAn = (
--    SELECT TOP 1 IDDoAn 
--    FROM DOAN D2 
--    WHERE D1.Loai = D2.Loai
--);

--SELECT IDDoAn, Ten, Loai, Gia, Mota, EncodeAnh
--FROM DOAN
--WHERE Loai = N'Đồ ăn';
