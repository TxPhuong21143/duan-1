insert into color values
(1,'RED','Màu Đỏ'),
(2,'BLUE','Màu Xanh Da Trời'),
(3,'GREEN','Màu Xanh Lá Cây'),
(4,'BLACK','Màu Đen'),
(5,'WHITE','Màu Trắng'),
(6,'Pink','Màu Hồng');

insert into categorytype values 
(1,'DRESS','Váy'),
(2,'PAN','Quần'),
(3,'SHIRT','Áo');

insert into size values 
(1,'S','Size S'),
(2,'L','Size L'),
(3,'XL','Size XL');

insert into brand values
(1,'LV','Luis Vuitton'),
(2,'Dior','Dior'),
(3,'Hermes','Hermes'),
(4,'Tiffany','Tiffany'),
(5,'VS','Victory Secret'),
(6,'Channel','Channel');

insert into producer values
(1,'US','Mỹ'),
(2,'France','Pháp'),
(3,'EngLand','Vương Quốc Anh'),
(4,'Italia','Ý'),
(5,'Japan','Nhật'),
(6,'VN','Việt Nam');

insert into productstatus values
(1,'SHELLING','Đang Bán'),
(2,'OUTQUANTITY','Hết Hàng'),
(3,'CLOSE','Ngừng Kinh Doanh');

insert into product values
(1,1,1,5,'2022-9-9',2310000,1,'Váy trắng dạ hội White Sheer Sleeves Raw Top Size S Luis Vuiiton','White Sheer Sleeves Raw Top',1,22,2500000,1,'2022-9-9'),
(2,2,1,1,'2022-9-9',4400000,2,'Váy xanh dạ hội Blue Midi Raw Coat Dress Size L','Blue Midi Raw Coat Dress',1,33,6270000,2,'2022-9-9'),
(3,3,1,6,'2022-9-9',1100000,3,'Váy hồng dạ hội Cap Sleeves Midi Taffeta Dress Size L','Cap Sleeves Midi Taffeta Dress',1,14,1900000,2,'2022-9-9'),
(4,4,1,4,'2022-9-9',4400000,4,'Váy đen dạ hội Black Sleeveless Midi Lace Dress Size XL','Black Sleeveless Midi Lace Dress',1,9,3390000,3,'2022-9-9');

select * from productimg;


insert into salesstatus values
(1,'FBD','Đang áp dụng'),
(3,'OFF','Ngừng áp dụng');

insert into saletype values 
(1,'SHIP-VOUCHER','Dành cho ship'),
(2,'BILL-VOUCHER','Dành cho bill');

insert into shipmethod values
(1,0,'QUICKSHIP','Giao hàng nhanh'),
(2,199000,'SUPPER','Hỏa tốc'),
(3,0,'INSHOP','Mua tại quầy');

insert into buymethod values
(1,'CARD','Thanh Toán Bằng Thẻ'),
(2,'HAND2MONEY','Thanh Toán Khi Nhận Hàng'),
(3,'BANKING','Chuyển Khoản'),
(4,'MONEY','Tiền Mặt'),
(5,'BANKING-MONEY','Chuyển Khoản Và Tiền Mặt');

insert into accountstatus values
(1,'OPEN','Truy Cập'),
(2,'LOCK','Khóa');

insert into clothesshop.role values
(1,'ADMIN','Quản trị viên'),
(2,'Employee','Nhân viên'),
(3,'Guest','Khách hàng');

insert into accountshipcontactstatus values
(1,'ON','Sử dụng'),
(2,'OFF','Ngừng sử dụng');

insert into billstatus values 
(1,'WAITTING','Chờ xác nhận'),
(2,'SHIPPING','Đang giao'),
(3,'SHIPPED','Đã giao'),
(4,'CANCEL','Đã hủy'),
(5,'CANCELSHIPPING','Đã hủy'),
(6,'ADMINCANCEL','Admin hủy'),
(7,'INSHOP','Chờ tại quầy');

insert into accounts values 
(1,'1998-12-24','TK1','2022-10-10','Admin','12341234',1,'adminsixdo','2022-10-10','Admin',1,null,'Admin SIXDO','2022-10-10'),
(2,'1998-12-24','TK2','2022-10-10','Employee','12341234',1,'employeesixdo','2022-10-10','Employee',2,null,'Employee SIXDO','2022-10-10'),
(3,'1998-12-24','TK3','2022-10-10','Customer','12341234',1,'cauvongsociu2','2022-10-10','KH',3,null,'Customer SIXDO','2022-10-10');