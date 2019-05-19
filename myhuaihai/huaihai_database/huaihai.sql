#创建数据库--怀海
SET NAMES UTF8;
DROP DATABASE IF EXISTS huaihai;
CREATE DATABASE huaihai CHARSET=UTF8;
USE huaihai;
#创建数据表
#创建用户表(hh_user)
	CREATE TABLE hh_user(
		uid INT PRIMARY KEY AUTO_INCREMENT,
		uname VARCHAR(32),
		upwd VARCHAR(32),
		email VARCHAR(64),
		phone VARCHAR(16),
		avatar VARCHAR(128),      #头像
		user_name VARCHAR(32),   #真实姓名
		gender INT,	#性别0或1
		birthday BIGINT
	);
 #插入用户信息
	INSERT INTO hh_user VALUES(NULL,'admin','huaihai','l_daozheng@163.com','15890595895','img/avatar/default.png','丁伟',1,1550000000000);
	INSERT INTO hh_user VALUES(NULL,'dingding','123456','l_daozheng@163.com','15890595895','img/avatar/default.png','丁伟',1,1550000000000);
	INSERT INTO hh_user VALUES(NULL,'dangdang','123456','l_daozheng@163.com','15890595895','img/avatar/default.png','党馨',0,1555000000000);
	INSERT INTO hh_user VALUES(NULL,'tom','123456','l_daozheng@163.com','15890595895','img/avatar/default.png','唐姆',1,1550000000000);
	INSERT INTO hh_user VALUES(NULL,'mary','123456','l_daozheng@163.com','15290601082','img/avatar/default.png','马锐',0,1555000000000);
	INSERT INTO hh_user VALUES(NULL,'mike','123456','l_daozheng@163.com','15290601082','img/avatar/default.png','麦克',1,1550000000000);
#创建地址表(hh_receiver_address)
	CREATE TABLE hh_receiver_address(
		aid INT PRIMARY KEY AUTO_INCREMENT,
		uid INT,	#用户编号
		receiver VARCHAR(16),	#接收人姓名
		province VARCHAR(16),	#省
		city VARCHAR(16),	#市
		county VARCHAR(16),	#县
		address VARCHAR(128),		#详细地址
		cellphone VARCHAR(16),	#手机
		fixedphone VARCHAR(16),	#固定电话
		postcode CHAR(6),	#邮编
		tag VARCHAR(16),	#标签名
		is_default BOOLEAN	#默认地址是否
	);
 #插入地址表
	#INSERT INTO hh_receive_address VALUES(NULL,);
#创建订单表(hh_order)
	CREATE TABLE hh_order(
		oid INT PRIMARY KEY AUTO_INCREMENT,
		uid INT,
		aid INT,
		status INT,	#订单状态
		order_time BIGINT,		#下单时间
		pay_time BIGINT,		#支付时间
		deliver_time BIGINT,	#发货时间
		recerived_time BIGINT	#签收时间
	);
#创建订单详情表(hh_order_detail)
	CREATE TABLE hh_order_detail(
		did INT PRIMARY KEY AUTO_INCREMENT,
		oid INT,	#订单编号
		wid INT,	#产品编号
		count INT	#数量
	);
#创建首页商品表(hh_index_product)
	CREATE TABLE hh_index_product(
		pid INT PRIMARY KEY AUTO_INCREMENT,
		title VARCHAR(64),
		pic VARCHAR(128),		#图片
		price DECIMAL(10,2),	#价格
		href VARCHAR(128),		
	);
#创建首页轮播图表(hh_index_carousel)
	CREATE TABLE hh_index_carousel(
		cid INT PRIMARY KEY AUTO_INCREMENT,
		img VARCHAR(128),	#图片路径
		href VARCHAR(128)	#图片链接
	);
#创建购物车表(hh_shopping_cart)
	CREATE TABLE hh_shopping_cart(
		cid INT PRIMARY KEY AUTO_INCREMENT,
		uid INT,	#用户编号
		wid INT,	#商品编号
		count INT,	#购买数量
		is_checked BOOLEAN	#是否勾选
	);
#创建商品类别表(hh_wine_family)
	CREATE TABLE hh_wine_family(
		fid INT PRIMARY KEY AUTO_INCREMENT,
		fname VARCHAR(32)	#分类名称
	);
#创建商品图片表(hh_wine_pic)
	CREATE TABLE hh_wine_pic(
		pid INT PRIMARY KEY AUTO_INCREMENT,
		wid INT,			#酒的编号
		sm VARCHAR(128),		#小图片路径
		md VARCHAR(128),		#中图片路径
		lg VARCHAR(128)	#大图片路径
	);
#创建商品表(hh_wine)
	CREATE TABLE hh_wine(
		wid INT PRIMARY KEY AUTO_INCREMENT,
		fid INT,		#所属型号家族编号
		pwid INT,	#产品编号
		title VARCHAR(128),	#主标题
		subtitle VARCHAR(128),	#副标题
		price DECIMAL(10,2),	#价格
		promise VARCHAR(64),	#服务承诺
		spec VARCHAR(64),		#规格/度数
		pname VARCHAR(32),	#商品名称
		memory VARCHAR(32),	#容量
		category VARCHAR(32),	#所属分类
		tid VARCHAR(10), #产品详细说明
		shelf_time BIGINT,		#上架时间
		sold_count INT,	#已售出的数量
		is_onsale BOOLEAN		#是否促销中
	);


















