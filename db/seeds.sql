-- Seed Data for employee_tracker_db

-- Populate department table
INSERT INTO department (name)
VALUES 
    ('Sales'),        -- ID: 1
    ('Engineering'),  -- ID: 2
    ('Finance'),      -- ID: 3
    ('Legal');        -- ID: 4


-- Populate role table

-- Note: department_id references the IDs created above
INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),         -- ID: 1, Sales Department
    ('Salesperson', 80000, 1),         -- ID: 2, Sales Department
    ('Lead Engineer', 150000, 2),      -- ID: 3, Engineering Department
    ('Software Engineer', 120000, 2),   -- ID: 4, Engineering Department
    ('Accountant', 125000, 3),         -- ID: 5, Finance Department
    ('Legal Team Lead', 250000, 4),    -- ID: 6, Legal Department
    ('Lawyer', 190000, 4);             -- ID: 7, Legal Department


-- Populate employee table

-- role_id references the roles created above
-- manager_id references other employees (NULL means no manager)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),          -- ID: 1, Sales Lead (No manager)
    ('Mike', 'Chan', 2, 1),            -- ID: 2, Reports to John Doe
    ('Ashley', 'Rodriguez', 3, NULL),   -- ID: 3, Lead Engineer (No manager)
    ('Kevin', 'Tupik', 4, 3),          -- ID: 4, Reports to Ashley Rodriguez
    ('Malia', 'Brown', 5, NULL),       -- ID: 5, Accountant (No manager)
    ('Sarah', 'Lourd', 6, NULL),       -- ID: 6, Legal Team Lead (No manager)
    ('Tom', 'Allen', 7, 6);            -- ID: 7, Reports to Sarah Lourd 