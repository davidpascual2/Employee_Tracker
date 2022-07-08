const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table')
require('dotenv').config()

// const connection = require('mysql2/typings/mysql/lib/Connection');
const res = require('express/lib/response');

const database = []

//connect to database
const connection = mysql.createConnection( 
    {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW, 
    database: 'management_db'
    },
    console.log(`connected to the management_db database`)
)

//connect to sql server and sql database
// connection.connect(function(err) {
//     if(err) throw err;
//     menu();
// })


//inquirer
function menu() {
    inquirer
        .prompt({

        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'Add Employee',
            'Update Employee Role',
            'View all Roles',
            'Add a Role',
            'View all Departments',
            'Add Department'
        ]
    }).then(function (answer) {
        switch (answer.menu) {
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'View all Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Delete an Employee':
                deleteEmployee();
                break;
            case 'Exit':
                exitApp();
                break;
            default:
                break;
        }
    })
}

//=====view all employees in database=====//
const viewEmployees = () => {
    connection.query(`SELECT * FROM Employees`, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.table(data);
        menu();
    })
};

//=====view all roles in database=====//
function viewRoles() {
    let query = 'SELECT * FROM Roles'; 
    connection.query(query, (err, data) => {
        if(err) {
            console.log(err);
        }; 
        console.table(data)
        menu();
    })
};

//=====view all departments in database=====//
function viewDepartments() {
    let query = 'SELECT * FROM department'; //????
    connection.query(query, function (err, data) {
        if(err) throw err; //results?
        console.log(data);
        menu();
    })
};



//==============================================================//
//add an employee to database
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'enter employee first name',

            },
            {
                type: 'input',
                name: 'last_name',
                message: 'enter employee last name',

            }
        ]).then(answer => {
            let params = [answer.first_name, answer.last_name];
            connection.query('SELECT title, id FROM roles', (err, result) => {
                if (err) {
                    console.log(err)
                }
                let roles = result.map(({ title, id }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "Choose the employee's role.",
                        choices: roles
                    }
                ]) .then(answer => {
                    let role = answer.role;
                    params.push(role);
                    connection.query('SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL', (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        let managers = result.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
                        managers.push({ name: "No manager", value: null });
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "manager",
                                message: "Choose the employee's manager.",
                                choices: managers
                            }
                        ]).then(answer => {
                            let manager = answer.manager;
                                params.push(manager);
                                connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', params, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log("Employee added");
                                    return menu();
                                    
                                })
                        })
                    })
                })
            })
        })
};
//==============================UPDATE EMP ROle========================================//

const updateEmployee = () => {
    connection.query("SELECT first_name, last_name, id FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        }
        let employees = result.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
        inquirer.prompt([
            {
                type: "list",
                name: "employeeUpdate",
                message: "Which employee's role would you like to change?",
                choices: employees
            }
        ])
            .then(answer => {
                let employeeChoice = answer.employeeUpdate;
                let params = [employeeChoice];
                connection.query("SELECT title, id FROM roles", (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    let roles = result.map(({ title, id }) => ({ name: title, value: id }));
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "roleUpdate",
                            message: "What is their new role?",
                            choices: roles
                        }
                    ])
                        .then(answer => {
                            let roleChoice = (answer.roleUpdate);
                            params.unshift(roleChoice);
                            connection.query("SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL", (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                let managers = result.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
                                managers.push({ name: "No manager", value: null });
                                inquirer.prompt([
                                    {
                                        type: "list",
                                        name: "newManager",
                                        message: "Choose the employee's new manager, if any.",
                                        choices: managers
                                    }
                                ])
                                    .then(answer => {
                                        let newManager = (answer.newManager);
                                        params.unshift(newManager);
                                        connection.query("UPDATE employees SET manager_id = ?, role_id = ? WHERE id = ?", params, (err) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            console.log("Employee updated!");
                                            return viewEmployees();
                                        })
                                    })
                            })
                        })


                })

            })

    })
};

    
        

//==============================ADD ROLE========================================//

//add a role in database
function addRole() {
    // connection.query('SELECT * FROM roles', (err, response) => { //results? role/s?
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'what is the name of new role?',

                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'what is the salary of new role?',

                }

            ]).then(answer => {
                let params = [answer.title, answer.salary];
                connection.query('SELECT * FROM department', (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    let depts = result.map(({name, id}) => ({ name: name, value: id}));
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "dept",
                            message: "Choose which department the new role is a part of.",
                            choices: depts
                        }
                    ]).then( answer => {
                        let dept = answer.dept;
                        params.push(dept);
                        connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', params, (err) => { //params?
                            if (err) {
                                console.log(err);
                            }
                            console.log("Role added");
                            return menu();
                        })
                    })
                })
            })
    
};
//===============================ADD DEPT=======================================//

//add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: 'Enter the name of new Department'
        }
    ]).then(answer => {
        let newDept = [answer.department_name];
        connection.query('INSERT INTO department (name) VALUES (?)', newDept, (err) => { //newDept?
            if (err) {
                console.log(err)
            }
            console.log("Department added");
                return menu();
        }) 
    })
};

menu();
//exit app

///////////////////////////////
//Bonus

//update employee role in database

//delete an employee

// function mainMenu() {
//     inquirer.prompt(menu).then(response => {
//         console.log('if statement')
//         if(response.menu === 'View all Employees') {
//             return viewEmployees();
//         } if(response.menu === '')
//     })
// }


// const addEmployee = () => {
//     connection.query('SELECT * FROM roles', (err, response) => { //results? role/s?
//         // if(err) throw err;
//         // let role_id = [];
//         //     for (let i = 0; i < response.length; i++) {
//         //         role_id.push(response[i].title)
//         //     }
        
//         inquirer
//             .prompt([
//                 {
//                     type: 'input',
//                     name: 'first_name',
//                     message: 'enter employee first name',

//                 },
//                 {
//                     type: 'input',
//                     name: 'last_name',
//                     message: 'enter employee last name',

//                 },
//                 {
//                     type: 'list',
//                     name: 'empRole',
//                     message: "what is the new employee's Role?",
//                     choices:  roles//roleArray //selectRole()
//                 },
//                 {
//                     type: 'list',
//                     name: 'empManager',
//                     message: "Who is the new employee's manager?",
//                     choices: selectManager()
//                 },
//             ]).then( (answer) => {
//                 connection.query(
//                     'INSERT INTO employees SET ?',
//                     {
//                         first_name: answer.first_name,
//                         last_name: answer.last_name,
//                         role_id: answer.role_id,
//                         manager_id: answer.manager_id,
                        
                        
                        
//                     },
//                     (err) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                         console.log('Employee added!');
//                         menu();
//                     })
//             })
//     })
// };


// // let newArray = [] //????????
// var roleArray = [];
// const selectRole = () => {
//     connection.query(`SELECT * FROM roles`, (err, response) => {
//         if(err) throw err;
//         let roles = response.map(({ title, id }) => ({ name: title, value: id }));
//         for (let i=0; i < response.length; i++) {
//             roleArray.push(response[i].id + ' ' + data[i].title)
//             // newArray.push({"id": response[i].id, "title": response[i].title}) //??????
//         }
//     })
//     // return roleArray;
// }

// //======manager name array for add emp=====//
// var managerArray = [];
// const selectManager = () => {
//     connection.query(`SELECT * FROM employees WHERE manager_id IS NULL`, (err, response) => {
//         if (err) throw err;
//         for(let i=0; i < response.length; i++) {
//             managerArray.push(response[i].first_name)
//         }
//     })
//     return managerArray;
// }

