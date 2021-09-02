INSERT INTO
  departments (deparements_name)
VALUES
  (
    "Executive",
    "Sales",
    "HR",
    "Engineering",
    "Finance",
    "Marketing"
  )
INSERT INTO
  roles (title, Salary, department_id)
VALUES
  -- Executives
  ("CEO", 1000000, 1),
  ("CFO", 800000, 1),
  ("COO", 800000, 1),
  --   Sales Department
  ("Director of Sales", 600000, 2),
  ("Sales Manager", 300000, 2),
  ("Salesperson", 150000, 2),
  ("Salesperson", 150000, 2),
  --   HR
  ("Director of HR", 600000, 3),
  ("Manager of HR", 300000, 3),
  ("Talent Recuiter", 150000, 3),
  -- Engineering
  ("Director of Engineering", 600000, 4),
  ("Manager of Engineering", 300000, 4),
  ("Engineer", 200000, 4),
  ("Engineer", 200000, 4),
  ("Srum Master", 250000, 4) -- Finance
  ("Director of Finance", 600000, 5),
  ("Manager of Money", 300000, 5),
  ("Accountant", 100000, 5),
  ("Analyst of Finance", 100000, 5),
  -- Marketing
  ("Director of Marketing", 600000, 6),
  ("Content Manager", 300000, 6),
  ("Social Media Manager", 50000, 6),
INSERT into
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Lanora", "Mellinger", 1, 1),
  ("nora", "Melli", 2, 1),
  ("Norbert ", "Wronski ", 3, 1),
  ("Chloe", "Providence", 4, 1),
  ("Zelma", "Deming ", 5, 4),
  ("Kourtney", "Kessinger ", 6, 5),
  ("Ophelia", "Folger  ", 7, 5),
  ("Arica", "Snellgrove ", 8, 2),
  ("Tennille", "Cypert", 9, 8),
  ("Ted", "Lasso", 10, 9),
  ("Barnaby", "Jones", 11, 3),
  ("Harry", "Potter", 12, 11),
  ("Farris", "Bueller", 13, 12),
  ("Hannah", "Montana", 14, 12),
  ("Kim", "Possible", 15, 11),
  ("Lizzie", "McGuire", 16, 2),
  ("Pheobe", "Buffay", 17, 16),
  ("Rachel", "Green", 18, 17),
  ("Joey", "Tribbiani", 19, 17),
  ("Chandler", "Bing", 20, 1),
  ("Monica", "Geller", 21, 20),
  ("Emily", "Gilmore", 22, 20);
SELECT
  employee.firt_name,
  employee.last_name,
  roles.title,
  roles.salary,
  department.department_name,
  employee.first_name as manager_firstname,
  employee.last_name as manager_lastname
from
  employee
  join roles on employee.role_id = roles.id
  join department on roles.department_id = department.id
  Left join employee as employee on employee.manager_id = employee.id;
select
  *
from
  department;
select
  *
from
  roles;
select
  *
from
  employee;