DROP DATABASE IF EXISTS bamazondb;
create database bamazonDB;
use bamazonDB;
create table products (
item_id integer primary key auto_increment not null,
product_name varchar(40) null,
department_name varchar(40) null,
price decimal (60),
stock_quantity integer
);
insert into products (product_name, department_name, price, stock_quantity)
values ('Moto Z', 'Cell Phones', 300.00, 500), ('Pixel 2', 'Cell Phones', 650.00, 500),
		('S8', 'Cell Phones', 800.00, 500), ('Note 8', 'Cell Phones', 875.00,500);
        

