USE employee_db;

INSERT INTO department(dept_name)values
("HR"), 
("Engineering"), 
("Interns");

INSERT INTO role(title, salary, department_id)values
("HR employee", 10.00, 1),
("Engineer", 20.00, 2),
("Intern", 0.00, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)values
("Tessa", "Robinson", 3, null),
("Jacob", "Carver", 2, null),
("Person", "3", 1, null);


