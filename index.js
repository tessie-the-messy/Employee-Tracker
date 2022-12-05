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
            db.query(`INSERT INTO department(dept_name)values ("${deptdata.newRole}")`, (err, res) => {
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
            }
        ])
        .then(roledata => {
            db.query(`INSERT INTO role(title)values ("${roledata.newRole}")`, (err, res) => {
                console.table(res)
                if (err) throw err
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
                message: "What's the employee's manager ID? (Please enter a number)",
                name: "newEmpManager"
            }

        ])
        .then(empdata => {
            db.query(`INSERT INTO employee(title)values ("${roledata.newRole}")`, (err, res) => {
                console.table(res)
                if (err) throw err
            })
            return appStart()
        })
    }
})
}
appStart()