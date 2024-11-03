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
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each department
    name VARCHAR(30) NOT NULL           -- Department name (required field)
);


-- Table `role`

-- Stores different job roles with their associated departments and salaries
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- identifier for each role
    title VARCHAR(30) NOT NULL,         -- Job title (required field)
    salary DECIMAL NOT NULL,            -- Annual salary for the role
    department_id INT,                  -- Foreign key linking to departments table
    FOREIGN KEY (department_id) REFERENCES department(id)  -- Ensures department exists
);

-- Table `employee`

-- Stores employee information including their role and manager
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each employee
    first_name VARCHAR(30) NOT NULL,    -- Employee first name (required field)
    last_name VARCHAR(30) NOT NULL,     -- Employee last name (required field)
    role_id INT,                        -- Foreign key linking to roles table
    manager_id INT,                     -- Self-referencing foreign key for manager
    FOREIGN KEY (role_id) REFERENCES role(id),        -- Ensures role exists
    FOREIGN KEY (manager_id) REFERENCES employee(id)   -- Ensures manager exists
);