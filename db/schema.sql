DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;

USE management_db;

CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL, 
);

CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY;
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE SET NULL
);

CREATE TABLE employees(
    id INT NOT NULL AUTO INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
    role_id INT NOT NULL;
    manager_id INT,
    FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE SET NULL,
    FOREIGN KEY (id)
        REFERENCES employees(id)
        ON DELETE SET NULL
);


