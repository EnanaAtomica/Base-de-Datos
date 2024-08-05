/*
import pg from 'pg';

// Destructure Client class from the pg module
const { Client } = pg;

// Define the connection string to connect to the PostgreSQL database
//const connectionString = 'postgresql://basedatos_postgresql_user:sqwLhN61zMBl9URhYQEJ18YT7Yu3amhl@dpg-cqkd3prqf0us73c7jgq0-a.oregon-postgres.render.com/basedatos_postgresql?ssl=true';
const connectionString =
'postgresql://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a.oregon-postgres.render.com:5432/base_de_datos_1erintento';

// Create a new Client instance with the connection string
const client = new Client({
  connectionString,
});

// Define an asynchronous function to create a table using a single client connection
async function createTableWithClient() {
  try {
    // Establish a connection to the database
    await client.connect();
    console.log('Connected to the database.');

    // Execute the SQL query to create the table if it does not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS empleados (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        edad INTEGER NOT NULL,
        puesto VARCHAR(100) NOT NULL
      );
    `);

    console.log('Table "empleados" created or already exists.');

    // Call the function to insert data after creating the table
    await insertData();
  } catch (error) {
    // Log any errors that occur during table creation
    console.error('Error creating table:', error.message);
    console.error('Error details:', error);
  } finally {
    // Close the client connection when done
    await client.end();
  }
}

// Define an asynchronous function to insert data into the empleados table
async function insertData() {
  try {
    // Reconnect to the database to perform data insertion
    await client.connect();
    console.log('Connected to the database.');

    // Insert data into the empleados table
    await client.query(`
      INSERT INTO empleados (nombre, edad, puesto) VALUES
      ('Juan Pérez', 30, 'Desarrollador'),
      ('Ana García', 25, 'Diseñadora'),
      ('Luis Martínez', 40, 'Gerente');
    `);

    console.log('Data inserted successfully.');
  } catch (error) {
    // Log any errors that occur during data insertion
    console.error('Error inserting data:', error.message);
    console.error('Error details:', error);
  } finally {
    // Close the client connection when done
    await client.end();
  }
}

// Call the function to create the table
createTableWithClient();
*/

import pg from 'pg';
// Destructure Client class from the pg module
const { Client } = pg;
// Define the connection string to connect to the PostgreSQL database
const connectionString =
'postgresql://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a.oregon-postgres.render.com:5432/base_de_datos_1erintento?ssl=true';

// Create a new Client instance with the connection string
const client = new Client({
  connectionString,
});
// Define an asynchronous function to create a table using a single
// client connection
async function createTableWithClient() {
  try {
    console.log('Connecting to the database...');
    // Establish a connection to the database
    await client.connect();
    console.log('Connected successfully.');

    // Execute the SQL query to create the table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
        name VARCHAR(100) NOT NULL, -- Name column, cannot be null
        email VARCHAR(100) UNIQUE NOT NULL, -- Email column, must be unique and not null
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp column with default value of current time
      )
    `);
    console.log('Table "users" created successfully.');
  } catch (error) {
    // Log any errors that occur during table creation
    console.error('Error creating table:', error);
  } finally {
    // Close the client connection when done
    console.log('Closing the connection...');
    await client.end();
    console.log('Connection closed.');
  }
}
// Call the function to create the table
createTableWithClient();
