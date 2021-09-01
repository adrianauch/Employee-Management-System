module.exports = {
  mainMenu: {
    type: "list",
    message:
      "How can we help you? Please select an option from the menu below:",
    choices: [
      "View All Departments",
      "View All Employees",
      "View All Roles",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Update Employee",
      "Quit",
    ],
    name: "mainMenu",
  },
  addNewEmployee: (roles, employees) => [
    {
      type: "input",
      messgae: "What is the employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      messgae: " What is the employee's last name?",
      name: "last_name",
    },
    {
      type: "list",
      message: "What is your employee's role ID?",
      name: "role_id",
      choices: roles,
    },
    {
      type: "list",
      message: "Who is your employee's manager?",
      name: "manager_id",
      choices: employees,
    },
  ],
  DepartmentQuestions: {
    type: "input",
    message: "What is the name of the department?",
    name: "department_name",
  },
  addRole: [
    {
      type: "input",
      message: "What is the title of your new role?",
      name: "titleRole",
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salary",
    },
    {
      type: "input",
      message: "What is the department id for this role?",
      name: "departmentIDrole",
    },
  ],
  quit: {
    type: "list",
    Message: "Are you sure you would like to exit the application?",
    choices: [" Yes", "No"],
  },
};
