const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Database mock
const employees = [];
const managers = [];
const departments = [];
const JWT_SECRET = "your-secret-key";

// Validation schemas using Joi
const employeeSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  departmentId: Joi.number().required(),
});

const managerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Employee Signup
app.post("/employee/signup", (req, res) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password, departmentId } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Password hashing failed" });

    const employee = { username, password: hash, departmentId };
    employees.push(employee);
    res.status(201).json({ message: "Employee signed up successfully" });
  });
});

// Manager Signup
app.post("/manager/signup", (req, res) => {
  const { error } = managerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Password hashing failed" });

    const manager = { username, password: hash };
    managers.push(manager);
    res.status(201).json({ message: "Manager signed up successfully" });
  });
});

// Employee Login
app.post("/employee/login", (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;
  const employee = employees.find((e) => e.username === username);
  if (!employee) return res.status(401).json({ error: "Invalid credentials" });

  bcrypt.compare(password, employee.password, (err, result) => {
    if (err || !result)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ username, role: "employee" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// Manager Login
app.post("/manager/login", (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;
  const manager = managers.find((m) => m.username === username);
  if (!manager) return res.status(401).json({ error: "Invalid credentials" });

  bcrypt.compare(password, manager.password, (err, result) => {
    if (err || !result)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ username, role: "manager" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// CRUD Operations for Departments
// Implement Create, Read, Update, and Delete (CRUD) endpoints for managers to manage departments.

// Assign Employees to a Department
// Implement an endpoint for managers to assign/select multiple employees to a department.

// Retrieve Paginated Department Tables
// Implement an endpoint for managers to retrieve department tables with pagination.

// Queries
// Implement the queries to retrieve employees in IT departments with location names starting with 'A' and employees in Sales departments in descending order of names.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
