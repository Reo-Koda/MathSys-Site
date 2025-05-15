CREATE DATABASE IF NOT EXISTS mathsys_db;
use mathsys_db;

CREATE TABLE IF NOT EXISTS Users (
  user_name VARCHAR(30) PRIMARY KEY,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Posts(
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(30),
  class_title TEXT NOT NULL,
  docter_name TEXT NOT NULL,
  year_num YEAR NOT NULL,
  undergraduate TEXT NOT NULL,
  course TEXT NOT NULL,
  category TEXT NOT NULL,
  images IMAGE NOT NULL,
  memo TEXT,
  post_date DATETIME NOT NULL,
  FOREIGN KEY (user_name) REFERENCES Users(user_name)
);