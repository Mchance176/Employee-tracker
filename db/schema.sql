-- Schema employee_tracker_db

-- Database for tracking employees, their roles, departments, and reporting structure

-- Drop existing database if it exists to start fresh
DROP DATABASE IF EXISTS employee_tracker_db;

-- Create new database
CREATE DATABASE employee_tracker_db;

-- Select the database for use
USE employee_tracker_db;


-- Table `department`

-- Stores different departments within the company
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(30) UNIQUE NOT NULL           
);


-- Table `role`

-- Stores different job roles with their associated departments and salaries
CREATE TABLE role (
   id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Table `employee`

-- Stores employee information including their role and manager
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);