const client = require('./client.js');

const createEmployee = async(employeeName, departmentID) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO employees (name, dept_id)
      VALUES ('${employeeName}', ${departmentID})
      RETURNING *
      `)
      const employee = rows[0];
      return employee
  } catch(error) {
    console.log(error)
  }
}

const getEmployees = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM employees;
      `);
    return rows;
  } catch(error) {
    console.log(error);
  }
}

const deleteEmployee = async(deletedEmployeeId) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM employees WHERE id=${deletedEmployeeId}
      `)
      return rows
  } catch(error) {
    console.log(error);
  }
}


module.exports = { createEmployee, getEmployees, deleteEmployee }