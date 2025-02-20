const client = require('./client.js');

const createDepartment = async(teamName) => {
  try {
      const { rows } = await client.query(`
      INSERT INTO departments (name) 
      VALUES ('${teamName}')
      RETURNING *;
    `);
    const department = rows[0];
    return department;
  } catch(error) {
    console.log(error);
  }
}

const getDepartments = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM departments;
      `);
    return rows;
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createDepartment, getDepartments }