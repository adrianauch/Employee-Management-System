Files needed:
need an index.js to create question prompts for command line app
need a db for sql - scheama and seeds
have to install inquirer and use workbench
mysql 2

Prompts:
question 1: what would you like to do?
options [view all employees, Add Employee, update employee roles, view all roles, add role, view all departments, add department]

if view all employees is selected:
-formatted table showing department names and department ids

if view all roles is selected:
-job title, role id, the department that role belongs to, and the salary for that role

if view all employees selected:
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
