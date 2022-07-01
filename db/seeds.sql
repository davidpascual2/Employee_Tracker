INSERT INTO 'department' (id, name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO 'roles' (id, title, salary, department_id)
VALUES  (001, 'Sales Lead', 60000, 004),
        (002, "Salesperson", 50000, 004),
        (003, 'Lead Engineer', 100000, 001);
        (004, 'Software Engineer', 80000, 001),
        (005, 'Account Manager',90000, 002),
        (006, 'Accountant', 70000, 002),
        (007, 'Legal Team Lead', 90000, 004),
        (008, 'Lawyer', 70000, 004);

INSERT INTO 'employees' (id, first_name, last_name, role_id, manager_id)
VALUES  (001, 'John', 'Doe', 001, 'null'),
        (002, 'Aubrey', 'Graham', 002, 001),
        (003, 'Dwayne', 'Carter', 003, 'null'),
        (004, 'Jermaine', 'Cole', 004, 003),
        (005, 'Jonathan', 'Kirk', 005, 'null'),
        (006, 'Jacques', 'Webster', 006, 005),
        (007, 'Lebron', 'James', 007, 'null'),
        (008, 'Kawhi', 'Leonard', 008, 007),
        

    
