import pg from 'pg';

// Destructure Client class from the pg module
const { Client } = pg;

// Define the connection string to connect to the PostgreSQL database
const connectionString =
'postgresql://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a.oregon-postgres.render.com:5432/base_de_datos_1erintento?ssl=true';


// Define an asynchronous function to query and display data from the empleados table
async function queryData() {
  const client = new Client({ connectionString });
  try {
    // Establish a connection to the database
    await client.connect();
    console.log('Connected to the database.');

    // Query the empleados table
    const res = await client.query('SELECT * FROM empleados;');

    // Display the results
    console.log('Query Results:', res.rows);
  } catch (error) {
    // Log any errors that occur during querying
    console.error('Error querying data:', error.message);
    console.error('Error details:', error);
  } finally {
    // Close the client connection when done
    await client.end();
  }
}

// Execute the function to query and display data
queryData();
