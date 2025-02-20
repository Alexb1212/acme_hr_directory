const express = require('express');
const app = express();
const port = 5432;
const { createEmployee, getEmployees, deleteEmployee } = require('./db/employees.js');
const { getDepartments } = require('./db/departments.js');

app.use(express.json());

const client = require('./db/client.js');
client.connect();

app.get('/api/v1/employees', async(req, res) => {
  res.send(await getEmployees());
});

app.get('/api/v1/departments', async(req, res) => {
  res.send(await getDepartments());
});

app.post('/api/v1/employees', async(req, res) => {
  const { name, dept_id } = req.body;

  try {
    const newEmployee = await createEmployee(name, dept_id);
    res.send(newEmployee);
  } catch(error) {
    console.log(error);
  }
});

app.delete('/api/v1/employees/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteEmployee(id);
  } catch(error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));