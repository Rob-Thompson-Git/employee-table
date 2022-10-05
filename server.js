const db = require('./config/mysqlConnection')
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

console.log(db);

function start() {
    inquirer
        .prompt([
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
                name: 'list',
            },
        ]).then((response) => {
            switch (response.list) {
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
                    viewAllDep();
                    break;
                case 'Add Departments':
                    addDepartments();
                    break;
                case 'Leave':
                    db.end();
                    break;
            }
        })
};

//View all employees
viewAllEmployees(() => {
    let query = `Select * FROM employee`;
    db.query(query, function (err, res) {
        if(err) throw err;
        console.table(res);
        start();
    })
})

addEmployee(() => {
    let query = `Select `
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
})

updateEmployeeRole(() => {
    let query = `Select `
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
})

viewAllRoles(() => {
    let query = `SELECT * FROM role`;
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
})

addRole(() => {
    let query = `Select `
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
})

addEmployee(() => {
    let query = `Select `
    db.query(query, function (err, res) {
        console.table(res);
        start();
    })
})

viewAllDep(() => {
    let query = `SELECT * FROM department`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
})

addDepartments(() => {
    db.query(`SELECT * FROM department`, (err, res) => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter new department name?',
                    name: 'depAdd'
                },
            ]).then((res) => {
                db.query('INSERT INTO department SET ?', 
                {department_name: res.add})
                start();
            })
    })
    // let query = `Select `
    // db.query(query, function (err, res) {
    //     console.table(res);
    //     start();
    // })
})

start();

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));