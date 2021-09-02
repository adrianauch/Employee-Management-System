// require in node modules
const inquirer = require("inquirer");
const sql = require("mysql2");
const table = require("console.table");
// require in questions
const questions = require("./assets/promptQuestions");
// require in art for app:
const logo = require("asciiart-logo");

// connection for mySQL2
const connection = require("./config/connection");
// Call start
renderlogo();
start();

// render employee management logo:
function renderlogo() {
  console.log(
    logo({
      name: "Employee Management System",
      font: "Calvin S",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "cyan",
      logoColor: "bold-magenta",
      textColor: "magenta",
    }).render()
  );
}

// Prompt for main menu selection:
async function start() {
  // this connects to question js in assests
  const userChoice = await inquirer.prompt(questions.mainMenu);
  // console.log(userChoice);
  switch (userChoice.mainMenu) {
    case "View All Departments":
      viewDepartment();
      break;
    case "View All Roles":
      viewRole();
      break;
    case "View All Employees":
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
      Quit();
  }
}
// View Department:
function viewDepartment() {
  console.log("Department Table\n");
  connection.query(
    // Query to select data
    "SELECT id AS `ID`, departments_name AS `Department` FROM departments",
    function (err, res) {
      if (err) {
        console.log(err);
      }
      // Log all results of the SELECT statement
      console.table(res);
      // re-prompt user
      start();
    }
  );
}
//view roles
function viewRole() {
  console.log("Company Roles\n");
  connection.query(
    // Query to select data- all data from role table, salary, dep id and title
    "SELECT title AS `Title`, salary AS `Salary`, department_id AS `Department Id` FROM roles",
    function (err, res) {
      if (err) {
        console.log(err);
      }
      // Log all results of the SELECT statement
      console.table(res);
      // re-prompt user
      start();
    }
  );
}
// view employees
function viewEmployee() {
  console.log("All Company Employees\n");
  connection.query(
    // query statement- pull first name, last name, role id from employee table
    "SELECT first_name AS `First Name`, last_name AS `Last Name`, role_id AS `Role Id` FROM employees",
    function (err, res) {
      if (err) {
        console.log(err);
      }
      // Log all results of the SELECT statement
      console.table(res);
      // re-promt user
      start();
    }
  );
}

async function AddEmployee() {
  let qry =
    "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employees";
  connection.query(qry, async (err, employees) => {
    // query for data from roles table
    qry = "SELECT id as value, title as name FROM roles";
    connection.query(qry, async (err, roles) => {
      // get the name, category, from user
      const newEmp = await inquirer.prompt(
        questions.addNewEmployee(roles, employees)
      );
      // insert collectd data from user
      qry = "INSERT INTO employees SET ?";
      connection.query(qry, newEmp, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("New employee was added successfully!");
        // re-prompt the user
        start();
      });
    });
  });
}

async function AddDepartment() {
  const departmentDetails = await inquirer.prompt(questions.addNewDepartment());
  connection.query(
    "INSERT INTO departments SET ?",
    {
      departments_name: departmentDetails.departments_name,
    },
    function (err) {
      if (err) {
        console.log(err);
      }
      console.log("New department was added successfully!");
      // re-prompt the user
      start();
    }
  );
}

async function AddRole() {
  const roleDetails = await inquirer.prompt(questions.addNewRole());
  connection.query(
    "INSERT INTO roles SET ?",
    {
      title: roleDetails.titleRole,
      salary: roleDetails.salary,
      department_id: roleDetails.department_id,
    },
    function (err) {
      if (err) {
        console.log(err);
      }
      console.log("New department was added successfully!");
      // re-prompt the user
      start();
    }
  );
}

async function updateEmployee() {
  // query for the category choices
  connection.query("SELECT * FROM employees", async (err, employee) => {
    // get the name, category, from user
    const { worker, newrole } = await inquirer.prompt([
      {
        type: "list",
        message: "Choose an employee to update:",
        name: "worker",
        choices: () => {
          // iterating over employees and selecting the user selected
          return employee.map((employee) => employee.last_name);
        },
      },
      {
        type: "list",
        message: "What is this employee's new role?",
        name: "newrole",
        choices: () => {
          // updating role id
          return employee.map((employee) => employee.role_id);
        },
      },
    ]);
    connection.query(
      // updated employee with the user provided role id and last name
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
        if (err) {
          console.log(err);
        }
        console.log(res.affectedRows + " employee updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        // retruns the updated employee table
        console.table(employee);
        // re-promt user
        start();
      }
    );
  });
}
function Quit() {
  // closes the menu.
  console.log("Good Bye!");
}
