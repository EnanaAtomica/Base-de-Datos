import pg from 'pg';

// Destructure Client class from the pg module
const { Client } = pg;

// Define the connection string to connect to the PostgreSQL database
const connectionString =
'postgresql://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a.oregon-postgres.render.com:5432/base_de_datos_1erintento?ssl=true';

// Define an asynchronous function to insert data into the empleados table
async function insertData() {
  const client = new Client({ connectionString });
  try {
    // Establish a connection to the database
    await client.connect();
    console.log('Connected to the database.');

    // Insert data into the empleados table
    await client.query(`
      INSERT INTO empleados (nombre, edad, puesto) VALUES
      ('Juan Pérez', 30, 'Desarrollador'),
      ('Ana García', 25, 'Diseñadora'),
      ('Luis Martínez', 40, 'Gerente'),
      ('María López', 28, 'Analista'),
      ('Pedro Fernández', 35, 'Consultor'),
      ('Laura Gómez', 32, 'Marketing'),
      ('Carlos Ruiz', 45, 'Vendedor');
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

// Execute the function to insert data
insertData();
