const express = require("express");
const app = express();
app.use(express.json());

// Fake in-memory database
const employees = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" }
];

// Get all employees
app.get("/employees", (req, res) => {
    res.json(employees);
});

// Add a new employee
app.post("/employees", (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        ...req.body
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Update an employee
app.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find(emp => emp.id === parseInt(id));
    if (!employee) return res.status(404).send("Employee not found.");

    Object.assign(employee, req.body);
    res.json(employee);
});

// Delete an employee
app.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index === -1) return res.status(404).send("Employee not found.");

    employees.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log("Server running on port 3000"));
