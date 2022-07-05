INSERT INTO department (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', 60000, 4),
        ('Salesperson', 50000, 4),
        ('Lead Engineer', 100000, 1),
        ('Software Engineer', 80000, 1),
        ('Account Manager',90000, 2),
        ('Accountant', 70000, 2),
        ('Legal Team Lead', 90000, 4),
        ('Lawyer', 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, null),
        ('Aubrey', 'Graham', 2, 1),
        ('Dwayne', 'Carter', 3, null),
        ('Jermaine', 'Cole', 4, 3),
        ('Jonathan', 'Kirk', 5, null),
        ('Jacques', 'Webster', 6, 5),
        ('Lebron', 'James', 7, null),
        ('Kawhi', 'Leonard', 8, 7);

-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES  ('John', 'Doe', 1, 1),
--         ('Aubrey', 'Graham', 2, 1),
--         ('Dwayne', 'Carter', 3, 2),
--         ('Jermaine', 'Cole', 4, 3),
--         ('Jonathan', 'Kirk', 5, 2),
--         ('Jacques', 'Webster', 6, 5),
--         ('Lebron', 'James', 7, 2),
--         ('Kawhi', 'Leonard', 8, 7);