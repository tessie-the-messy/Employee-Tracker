-- Accessing database to edit 
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
id INT PRIMARY KEY AUTO_INCREMENT,
dept_name VARCHAR(30)
);

CREATE TABLE role (
id INT PRIMARY KEY auto_increment,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
dept_id INT,
FOREIGN KEY (dept_id) REFERENCES department(id)
);
CREATE TABLE employee (
id INT PRIMARY KEY auto_increment,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
FOREIGN KEY (role_id) references role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);



