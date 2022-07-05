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
    password: process.env.DB_PW, //?????????
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
            case 'Add Depertment':
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
    let query = 'SELECT * FROM Roles'; //departments????
    connection.query(query, (err, data) => {
        if(err) {
            console.log(err);
        }; //results?
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
    connection.query('SELECT * FROM roles', (err, response) => { //results? role/s?
        // if(err) throw err;
        // let role_id = [];
        //     for (let i = 0; i < response.length; i++) {
        //         role_id.push(response[i].title)
        //     }
        
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

                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: "what is the new employee's Role?",
                    choices: selectRole()
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: "Who is the new employee's manager?",
                    choices: selectManager()
                },
            ]).then(function(answer) {
                connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id,
                        manager_id: answer.manager_id,
                        
                    },
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Employee added!');
                        menu();
                    })
            })
    })
};

//add a role in database
function addRole() {
    connection.query('SELECT role.title AS Title, role.salary AS Salary FROM roles', (err, response) => { //results? role/s?
        // if(err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'Title',
                    message: 'what is the name of new role?',

                },
                {
                    type: 'input',
                    name: 'Salary',
                    message: 'what is the salary of new role?',

                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: "What department does this role belong to?",
                    choices: selectDept()
                }, 
            ]).then( (answer) => {
                connection.query(
                    'INSERT INTO roles SET?',
                    {
                        title: answer.Title,
                        salary: answer.Salary,
                        department_id: answer.department_id,
                    });
                    var query = 'SELECT * FROM roles';
                    connection.query(query, (err, response) => {
                    if(err) {
                        console.log(err)
                    };
                    console.log('your department was added!');
                    menu();
                    })
            })
    })
};

//add a department
function addDepartment() {
    connection.query('INSERT INTO departments (name) VALUES', function (err, data) { //results? role/s?
        if(err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'dep_name',
                    message: 'what is the name of new department?',

                },
            ])
    })
};
//============ARRAYS============//
let deptArray = []
const selectDept = () => {
    connection.query(`SELECT * FROM department`, (err, response) => {
        if(err) throw err;
        for (let i=0; i < response.length; i++) {
            deptArray.push(response[i].department_id)
        }
    })
}


let roleArray = [];
const selectRole = () => {
    connection.query(`SELECT * FROM roles`, (err, response) => {
        if(err) throw err;
        for (let i=0; i < response.length; i++) {
            roleArray.push(response[i].title)
        }
    })
    return roleArray;
}
//======manager name array for add emp=====//
var managerArray = [];
const selectManager = () => {
    connection.query(`SELECT * FROM employees WHERE manager_id IS NULL`, (err, response) => {
        if (err) throw err;
        for(let i=0; i < response.length; i++) {
            managerArray.push(response[i].first_name)
        }
    })
    return managerArray;
}


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