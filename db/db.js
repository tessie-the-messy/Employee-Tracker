const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shootroot",
    database: "employee_tracker",
  });

  db.connect((err) => {
    if (err) throw err;
  });
  
  module.exports = db;