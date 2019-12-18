DROP DATABASE IF EXISTS ebay_db;
CREATE DATABASE ebay_db;
USE ebay_db;

CREATE TABLE product (
	product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (250) NOT NULL,
    product_description VARCHAR (1000) NOT NULL, 
    highest_bid INT NOT NULL,
    PRIMARY KEY (product_id),
	seller_id INT NOT NULL,
	buyer_id INT NOT NULL
    );
    

CREATE TABLE seller (
	seller_id INT NOT NULL AUTO_INCREMENT,
    seller_name VARCHAR (250) NOT NULL,
    seller_phone NUMERIC NOT NULL, 
    PRIMARY KEY (seller_id),
	product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product (product_id)
);

CREATE TABLE buyer (
	buyer_id INT NOT NULL AUTO_INCREMENT,
    buyer_name VARCHAR (250) NOT NULL,
    buyer_phone NUMERIC NOT NULL, 
    PRIMARY KEY (buyer_id),
	product_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product (product_id)
);