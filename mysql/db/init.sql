CREATE DATABASE IF NOT EXISTS mathsys_db;
USE mathsys_db;

CREATE TABLE IF NOT EXISTS Users (
  user_name VARCHAR(30) PRIMARY KEY,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(30),
  class_title TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  year_num YEAR NOT NULL,
  undergraduate TEXT NOT NULL,
  course TEXT NOT NULL,
  category TEXT NOT NULL,
  images TEXT,
  memo TEXT,
  post_date DATE NOT NULL,
  FOREIGN KEY (user_name) REFERENCES Users(user_name)
);

INSERT INTO Users (user_name, password) VALUES
  ('月島 蛍', 'test_pass'),
  ('村田 獅子', 'test_pass'),
  ('西 穂希', 'test_pass'),
  ('紺野 優香', 'test_pass');

INSERT INTO Posts (user_name, class_title, doctor_name, year_num, undergraduate, course, category, post_date) VALUES
  ('月島 蛍', '経済学入門', '山田 伸二', 2023, '経済学部', '国際経済学科', '過去問', 20230813),
  ('村田 獅子', '民法', '小島 実', 2022, '法学部', '法律学科', '過去問', 20220816),
  ('西 穂希', '機械工学', '菊池 郷', 2018, '工学部', '機械工学科', 'レポート', 20190210),
  ('紺野 優香', '英語コミュニケーション', '藍田 志保', 2020, '文学部', '英文学科', 'レジュメ', 20210309);
