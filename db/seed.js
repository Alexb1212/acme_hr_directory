const client = require('./client.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS departments;
      `)
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE departments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL
      );

      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(36) NOT NULL,
        dept_id INTEGER REFERENCES departments(id)
      );
    `);
  } catch(error) {
    console.log(error);
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('Connected to DB');

    console.log('Dropping Tables')
    dropTables();
    console.log('Tables Dropped');

    console.log('Creating Tables');
    await createTables();
    console.log('Tables Created');

    console.log('Creating Departments');
    const driver = await createDepartment('Driver');
    const frontOffice = await createDepartment('Front Office');
    const dispatch = await createDepartment('Dispatch');
    console.log('Departments Created')

    console.log('Creating Employees');
    await createEmployee('Alex Bouthillet', driver.id);
    await createEmployee('Emily Paige', frontOffice.id);
    await createEmployee('Savannah Sully', dispatch.id);
    console.log('Employees Created');

    await client.end();
    console.log('Disconnected from DB');
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();