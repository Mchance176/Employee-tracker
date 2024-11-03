# SQL Employee Tracker

## Description
A command-line application built from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
- WHEN I start the application, THEN I am presented with options to:
  - view all departments
  - view all roles
  - view all employees
  - add a department
  - add a role
  - add an employee
  - update an employee role

## Installation
1. Clone the repository
2. Install dependencies: `npm i inquirer@8.2.4`
3. Install MySQL
4. Run schema.sql and seeds.sql to set up database

## Usage
1. Start the application: `node server.js`
2. Select from the menu options to:
   - View all departments
   - View all roles
   - View all employees
   - Add a department
   - Add a role
   - Add an employee
   - Update an employee role

## Database Schema
- department
  - id: INT PRIMARY KEY
  - name: VARCHAR(30)

- role
  - id: INT PRIMARY KEY
  - title: VARCHAR(30)
  - salary: DECIMAL
  - department_id: INT

- employee
  - id: INT PRIMARY KEY
  - first_name: VARCHAR(30)
  - last_name: VARCHAR(30)
  - role_id: INT
  - manager_id: INT

## Video Walkthrough
[https://app.screencastify.com/v2/manage/videos/9Eq1yZqphktS7iUbkJVL](https://drive.google.com/file/d/1g7cg6XbY2GNpfQJqeWj6o4kysPTM7IPV/view)

## Technologies Used
- Node.js
- Inquirer 8.2.4
- MySQL
- console.table

## Questions
For any questions, please contact me at [Your GitHub](https://github.com/Mchance176)
