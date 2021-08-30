// require in node modules
const inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");
const sql = require("mysql2");
// require in data base

// Prompt for main menu selection:
const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "How can we help you? Please select from the options below:",
      Choice: [
        "View All Employees",
        "View all Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Role",
        "Add Department",
        "Update an Employee Role",
        "Quit",
      ],
      name: "main",
    })
    .then((selection) => {
      // going to need to call functions for each option.
      console.log(selection);
    });
};
// View All Employees Function:

// View all Departments Function

// View all Roles

// Add an Employee

// Add a Department

// Add a Role

// Update Employee Role.

// END Function:
