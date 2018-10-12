DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE storefront(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(45) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('pillow', 'home goods', 10, 100);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('pineapple', 'food', 5, 50);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('black pants', 'clothing', 20, 100);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('apron', 'clothing', 5, 200);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('white t shirt', 'clothing', 15, 75);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('bee', 'chemical warfare', 1, 1000);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('coconut oil', 'food', 8, 50);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('elepant', 'home goods', 3, 10);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('live hand grenade', 'chemical warfare', 25, 15);
INSERT INTO storefront (product_name, category, price, stock_quantity) VALUES ('electric eel', 'food', 50, 75);