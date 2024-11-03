const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// Database configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: 'Password4321$',    
    database: 'employee_tracker_db'
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the employee database.');
    startApp();
});

// Main menu prompt using Inquirer
function startApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])
    .then(answer => {
        switch (answer.action) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                process.exit();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// View all departments
function viewDepartments() {
    const query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// View all roles
function viewRoles() {
    const query = `
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role 
        JOIN department ON role.department_id = department.id`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// View all employees
function viewEmployees() {
    const query = `
        SELECT e.id, 
               e.first_name, 
               e.last_name, 
               role.title, 
               department.name AS department, 
               role.salary, 
               CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: input => input ? true : 'Department name cannot be empty.'
        }
    ])
    .then(answer => {
        db.query('INSERT INTO department SET ?', { name: answer.name }, (err) => {
            if (err) throw err;
            console.log('Department added successfully!');
            startApp();
        });
    });
}

// Add a role
function addRole() {
    // First get all departments for the choices
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;
        
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
                validate: input => input ? true : 'Role title cannot be empty.'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?',
                validate: input => !isNaN(input) ? true : 'Please enter a valid number.'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
            }
        ])
        .then(answer => {
            db.query('INSERT INTO role SET ?', answer, (err) => {
                if (err) throw err;
                console.log('Role added successfully!');
                startApp();
            });
        });
    });
}

// Add an employee
function addEmployee() {
    // Get roles and employees for choices
    db.query('SELECT id, title FROM role', (err, roles) => {
        if (err) throw err;
        db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                    validate: input => input ? true : 'First name cannot be empty.'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                    validate: input => input ? true : 'Last name cannot be empty.'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Which role does this employee have?',
                    choices: roles.map(role => ({ name: role.title, value: role.id }))
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is the employee\'s manager?',
                    choices: employees.map(employee => ({ name: employee.name, value: employee.id }))
                }
            ])
            .then(answer => {
                db.query('INSERT INTO employee SET ?', answer, (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    startApp();
                });
            });
        });
    });
}

// Update an employee's role
function updateEmployeeRole() {
    // Get both employees and roles data for the choices
    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
        if (err) throw err;
        
        // Add this query to get roles
        db.query('SELECT id, title FROM role', (err, roles) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Which employee would you like to update?',
                    choices: employees.map(employee => ({ name: employee.name, value: employee.id }))
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Which role would you like to assign to this employee?',
                    choices: roles.map(role => ({ name: role.title, value: role.id }))
                }
            ])
            .then(answer => {
                db.query('UPDATE employee SET role_id = ? WHERE id = ?', 
                    [answer.role_id, answer.employee_id], 
                    (err) => {
                        if (err) throw err;
                        console.log('Employee role updated successfully!');
                        startApp();
                    }
                );
            });
        });
    });
}