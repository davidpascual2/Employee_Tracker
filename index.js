const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
const res = require('express/lib/response');

const database = []

//connect to database
const Connection = mysql.createConnection( 
    {
    host: 'localhost',
    user: 'root',
    password: 'Dave52416', //?????????
    database: 'management_db'
    },
    console.log(`connected to the books_db database`)
)

//connect to sql server and sql database
Connection.connect(function(err) {
    if(err) throw err;
    menu();
})

//import classes?


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
            case 'View all employees':
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

//view all employees in database
function viewEmployees() {
    let query = 'SELECT * FROM employee';
    Connection.query(query, function (err, data) { //results?
        if(err) throw err;
        console.log(data);
        menu();
    })
};

//view all roles in database
function viewRoles() {
    let query = 'SELECT * FROM Roles'; //departments????
    Connection.query(query, function (err, data) {
        if(err) throw err; //results?
        console.log(data);
        menu();
    })
};

//view all departments in database
function viewDepartments() {
    let query = 'SELECT * FROM department'; //????
    Connection.query(query, function (err, data) {
        if(err) throw err; //results?
        console.log(data);
        menu();
    })
};

//add an employee to database
function addEmployee() {
    console.log("inside addemp")
    Connection.query('SELECT * FROM roles', function (err, data) { //results? role/s?
        if(err) throw err;
        let role_id = [];
            for (let i = 0; i < data.length; i++) {
                role_id.push(data[i].id)
            }
        
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
                    choices: role_id

                        //map method
                        // 'sales lead',
                        // 'sales person',
                        // 'lead engineer',
                        // 'software engineer',
                        // 'account manager',
                        // 'accountant',
                        // 'legal team lead',
                        // 'lawyer',
                    

                },
                {
                    type: 'input',
                    name: 'empManager',
                    message: "What is the new employee's manager ID?",
                },
                {
                    type: 'input',
                    name: 'menu',
                    message: 'back to menu',

                }
            ]).then(function(answer) {
                // Connection.query(
                //     'INSERT INTO employee SET?',
                //     {
                //         first_name: answer.first_name,
                //         last_name: answer.last_name,
                //         manager_id: answer.manager_id,
                //         role_id: answer.role_id,
                //     },
                //     function (err) {
                //         if (err) throw err;
                //         console.log('Employee added!');
                //         menu();
                //     })
            }).catch(function(err) {
                console.log(err);
            })
    })
};

//add a role in database
function addRole() {
    Connection.query('SELECT * FROM role', function (err, data) { //results? role/s?
        if(err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'role_name',
                    message: 'what is the name of new role?',

                },
                {
                    type: 'input',
                    name: 'role_salary',
                    message: 'what is the salary of new role?',

                },
                {
                    type: 'list',
                    name: 'role_dep',
                    message: "What department does this role belong to?",
                    choices: [
                        'Engineering',
                        'Finance',
                        'Legal',
                        'Sales',
                    ]
                } 
            ]).then(function(answer) {
                Connection.query(
                    'INSERT INTO department SET?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: answer.role_id
                    });
                    var query = 'SELECT * FROM department';
                    Connection.query(query, function(err, res){
                    if(err) throw err;
                    console.log('your department was added!');
                    menu();
                    })
            })
    })
};

//add a department
function addDepartment() {
    Connection.query('SELECT * FROM role', function (err, data) { //results? role/s?
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