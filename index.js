// const db = require("./db/db")
const inquirer = require("inquirer")
// require("console.table")
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shootroot",
    database: "employee_db",
  });

  db.connect((err) => {
    if (err) throw err;
  });

let appStart = () => {
inquirer.prompt ( [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View employees", "View Roles", "View Departments", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"],
        name: "todo"
    }

]).then(data => {
    if (data.todo === "View Departments") {
        db.query(`SELECT * FROM department`, (err, res) => {
            console.table(res)
            if (err) throw err
        })
        return appStart()
    }
    else if (data.todo === "View employees") {
        db.query(`SELECT * FROM employee`, (err, res) => {
            console.table(res)
            if (err) throw err
        })
        return appStart()
    }
    else if (data.todo === "View Roles") {
        db.query(`SELECT * FROM role`, (err, res) => {
            console.table(res)
            if (err) throw err
        })
        return appStart()
    }
    else if (data.todo === "Add a Department") {
        inquirer.prompt([
            {
                type: "input",
                message: "What's the department name?",
                name: "newDept"
            }
        ])
        .then(deptdata => {
            db.query(`INSERT INTO department(dept_name)values ("${deptdata.newDept}")`, (err, res) => {
                console.table(res)
                if (err) throw err
            })
            return appStart()
        }) 
    }
    else if (data.todo === "Add a Role") {
        inquirer.prompt([
            {
                type: "input",
                message: "What's the role name?",
                name: "newRole"
            },
            {
                type: "input",
                message: "What department id?",
                name: "deptId"
            },
            {
                type: "input",
                message: "What is the salary (please use decimals)?",
                name: "salary"
            }
        ])
        .then(roledata => {
            db.query(`INSERT INTO role(title, salary, department_id)values ("${roledata.newRole}", ${roledata.salary}, ${roledata.deptId})`, (err, res) => {
                console.table(res)
                if (err) {
                    console.log(err)
                    throw err
            }
            })
            return appStart()
        })
    }
    else if (data.todo === "Add an Employee") {
        inquirer.prompt([
            {
                type: "input",
                message: "What's the employee's first name?",
                name: "newEmpName"
            },
            {
                type: "input",
                message: "What's the employee's last name?",
                name: "newEmpLName"
            },
            {
                type: "input",
                message: "What's the employee's role ID? (Please enter a number)",
                name: "newEmpRole"
            },
            {
                type: "input",
                message: "What's the employee's manager ID? (Please enter a number)",
                name: "newEmpManager"
            }

        ])
        .then(empdata => {
            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)values ("${empdata.newEmpName}", "${empdata.newEmpLName}", ${empdata.newEmpRole}, ${empdata.newEmpManager})`, (err, res) => {
                console.table(res)
                if (err) throw err
            })
            return appStart()
        })
    }
    else if (data.todo === "Update an Employee Role"){
        inquirer.prompt([
            {
                type: "input",
                message: "What's the employees name?",
                name: "empName"
            },
            {
                type: "input",
                message: "What is their new role id?",
                name: "roleId"
            }
        ]).then(empRoleData => {
            db.query(`UPDATE employee set role_id = ${empRoleData.roleId} where first_name = "${empRoleData.empName}"`, (err, res) => {
                console.table(res)
                if (err) throw err
            })
            return appStart()
        })
    }
    else if (data.todo === "Quit"){
        return
    }
})
}
appStart()