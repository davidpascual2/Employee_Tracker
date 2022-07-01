INSERT INTO 'department' (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO 'roles' (title, salary, department_id)
VALUES  ('Sales Lead', 60000, 004),
        ("Salesperson", 50000, 004),
        ('Lead Engineer', 100000, 001);
        ('Software Engineer', 80000, 001),
        ('Account Manager',90000, 002),
        ('Accountant', 70000, 002),
        ('Legal Team Lead', 90000, 004),
        ('Lawyer', 70000, 004);

INSERT INTO 'employees' (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 001, 'null'),
        ('Aubrey', 'Graham', 002, 001),
        ('Dwayne', 'Carter', 003, 'null'),
        ('Jermaine', 'Cole', 004, 003),
        ('Jonathan', 'Kirk', 005, 'null'),
        ('Jacques', 'Webster', 006, 005),
        ('Lebron', 'James', 007, 'null'),
        ('Kawhi', 'Leonard', 008, 007);
        

    
