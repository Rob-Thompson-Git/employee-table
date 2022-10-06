const db = require('./db')
const { prompt } = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2');

function start() {
        prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Leave'],
                name: 'menu',
            },
        ]).then((response) => {
            switch (response.menu) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewAllDeps();
                    break;
                case 'Add Department':
                    addDepartments();
                    break;
                case 'Leave':
                    db.connection.end();
                    break;
            }
        })
};

//View
function viewAllEmployees() {
    
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => start());
}

function viewAllDeps() {
    db.findAllDepartments()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => start());
}

function viewAllRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => start());
}

//Add
function addEmployee() {
    prompt([
        {
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            name: 'last_name',
            message: 'What is the employees last name?'
        },
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({id, title}) => ({
                name: title, 
                value: id
            }));
            prompt({
                type: 'list',
                name: 'roleId',
                message: 'What is the employees role?',
                choices: roleChoices
            })
            .then(res => {
                let roleId = res.roleId;
                db.findAllEmployees()
                .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({
                        id, first_name, last_name
                    }) => ({
                        name: `${first_name} ${last_name}`, 
                        value: id
                    }));
                    managerChoices.unshift({name: 'None', value: null});
                    prompt({
                        type: 'list',
                        name: 'managerId',
                        message: 'Who is the employees manager?',
                        choices: managerChoices
                    })
                    .then(res => {
                        let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }
                        db.createEmployee(employee);
                    })
                    .then(() => 
                    console.log(`added ${firstName} ${lastName} to the database`))
                    .then(() => start())
                })
            })
        })
    })
}

function addDepartments()  {
    prompt([
            {
                name: 'new_dep',
                message: 'What is the name of the department?',
                
            },
        ])
            .then(res => {
                const newDep = res.new_dep;
                let department = {
                    name: newDep
                }
                db.createDepartment(department);
        })
            .then(() => 
            console.log(`added ${newDep} to the database`))
            .then(() => start())
    }





const updateEmployeeRole = () => {
    let query = `Select `
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
}



const addRole = () => {
    let query = `Select `
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
}


start();




