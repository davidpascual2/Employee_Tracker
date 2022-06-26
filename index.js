const inquirer = require('inquirer')

const database = []

//import classes?

const menu = [

    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do',
        choices: [
            'View all Employees',
            'Add Employee',
            'Update Employee Role',
            'View all Roles',
            'Add a Role',
            'View all Departments',
            'Add Department'
        ]
    },
    {

    }
]

function mainMenu() {
    inquirer.prompt(menu).then(response => {
        console.log('if statement')
    })
}