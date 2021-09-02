// require in node modules
const inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");
const sql = require("mysql2");
const table = require("console.table");
// require in questions
const questions = require("./assets/promptQuestions");

// connection for mySQL2
const connection = require("./config/connection");
// Call start
start();

// Prompt for main menu selection:
async function start() {
  const userChoice = await inquirer.prompt(questions.mainMenu);
  switch (userChoice.Main) {
    case "View Departments":
      viewDepartment();
      break;
    case "View Roles":
      viewRole();
      break;
    case "View Employees":
      viewEmployee();
      break;
    case "Add Employee":
      AddEmployee();
      break;
    case "Add Department":
      AddDepartment();
      break;
    case "Add Role":
      AddRole();
      break;
    case "Update Employee":
      updateEmployee();
      break;
    case "Quit":
      connection.end();
  }
}
// View All Employees Function:
function viewEmployee() {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    start();
  });
}

// View all Departments Function
function viewDepartment() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    start();
  });
}

// View all Roles
function viewRole() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    start();
  });
}

// Add an Employee
async function AddEmployee() {
  let qry =
    "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employees";
  connection.query(qry, async (err, employees) => {
    qry = "SELECT id as value, title as name FROM roles";
    connection.query(qry, async (err, roles) => {
      // get the name, category
      const newEmp = await inquirer.prompt(
        questions.addNewEmployee(roles, employees)
      );
      qry = "INSERT INTO employees SET ?";
      connection.query(qry, newEmp, function (err) {
        if (err) throw err;
        console.log("New employee was added successfully!");
        // re-prompt the user to main menu
        start();
      });
    });
  });
}

// Add a Department
async function AddDepartment() {
  const departmentDetails = await inquirer.prompt(addNewDepartment);
  connection.query(
    "INSERT INTO departments SET ?",
    {
      name: departmentDetails.department_name,
    },
    function (err) {
      if (err) throw err;
      console.log("New department was added successfully!");
      // re-prompt the user
      start();
    }
  );
}

// Add a Role
async function AddRole() {
  const NewRole = await inquierer.prompt(addNewRole);
  connection.query(
    "INSERT INTO roles SET?",
    {
      title: roleDetails.titleRole,
      salary: roleDetails.salary,
      department_id: roleDetails.departmentIdRole,
    },
    function (err) {
      console.log(err);
    },
    console.log("New Role hass been added")
  );
}

// Update Employee Role.
async function updateEmployee() {
  // query for the category choices
  connection.query("SELECT * FROM employees", async (err, employee) => {
    // get the name, category, starting bid from user
    const { worker, newrole } = await inquirer.prompt([
      {
        type: "list",
        message: "Choose an employee to update:",
        name: "worker",
        choices: () => {
          return employee.map((employee) => employee.last_name);
        },
      },
      {
        type: "list",
        message: "What is this employee's new role?",
        name: "newrole",
        choices: () => {
          return employee.map((employee) => employee.role_id);
        },
      },
    ]);
    connection.query(
      "UPDATE employees SET ? WHERE ?",
      [
        {
          role_id: newrole,
        },
        {
          last_name: worker,
        },
      ],
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        console.table(employee);
        start();
      }
    );
  });
}
