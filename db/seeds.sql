INSERT INTO department (id, name)
VALUES  (001, 'Engineering'),
        (002, 'Finance'),
        (003, 'Legal'),
        (004, 'Sales'),

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, 'Sales Lead'),
        (002, 'Salesperson'),
        (003, 'Lead Engineer'),
        (004, 'Software Engineer'),
        (005, 'Account Manager'),
        (006, 'Accountant'),
        (007, 'Legal Team Lead'),
        (008, 'Lawyer'),
        

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (001, 'John', 'Doe', 001, 'null'),
        (002, 'Aubrey', 'Graham', 002, 001),
        (003, 'Dwayne', 'Carter', 003, 'null'),
        (004, 'Jermaine', 'Cole', 004, 003),
        (005, 'Jonathan', 'Kirk', 005, 'null'),
        (006, 'Jacques', 'Webster', 006, 005),
        (007, 'Lebron', 'James', 007, 'null'),
        (008, 'Kawhi', 'Leonard', 008, 007),
        

    
