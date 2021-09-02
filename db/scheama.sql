DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- Switch to new db
USE employee_db -- Create deparement table:
CREATE TEABLE departments (
  id INT AUTOINCREMENT NOT NULL,
  departments_name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
) -- Create table for roles
CREATE TABLE roles (
  id INT AUTOINCREMENT NOT NULL,
  title VARCHAR (30) NOT NULL,
  Salary INT NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
) CREATE TABLE employees (
  id INT AUTOINCREMENT NOT NULL,
  first_name VARCHAR (20) NOT NULL,
  last_name VARCHAR (20) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
)