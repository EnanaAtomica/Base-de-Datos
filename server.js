import express from 'express';
import pg from 'pg';

// Destructure Client class from the pg module
const { Client } = pg;

// Define the connection string to connect to the PostgreSQL database
const connectionString ='postgresql://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a.oregon-postgres.render.com:5432/base_de_datos_1erintento?ssl=true';


// Create a new Client instance with the connection string and increased timeout settings
const client = new Client({
    connectionString,
    connectionTimeoutMillis: 30000, // 30 seconds
    idle_in_transaction_session_timeout: 60000 // 60 seconds
});

// Initialize Express app
const app = express();
const port = 3500;

// Middleware to parse JSON bodies
app.use(express.json());

// Define an asynchronous function to insert default data into the users table
async function insertDefaultData() {
    try {
        await client.connect();
        const query = `
            INSERT INTO empleados (nombre, edad, puesto) VALUES
      ('Juan Pérez del Sol', 40, 'Arquitecto'),
      ('Alan Martinez', 18, 'Secuestrador'),
      ('Tomas Irigoyen', 15, 'Ladron'),
      ('María Susena', 55, 'Jefe mayor de obras'),
      ('ALberto Fernández', 35, 'Psicologo'),
      ('Laura Giaz', 60, 'Psiquiatra'),
      ('Carlos Ruinas', 28, 'Desempleado');
        `;
        await client.query(query);
        return 'Default data inserted successfully.';
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
}

// Define an asynchronous function to read data from the users table
async function readData() {
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM empleados');
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
}

// Define an asynchronous function to delete data by id from the users table
async function deleteData(id) {
    try {
        await client.connect();
        const query = 'DELETE FROM empleados WHERE id = $1 RETURNING *;';
        const result = await client.query(query, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
}

// Define an asynchronous function to delete all data from the users table
async function deleteAllData() {
    try {
        await client.connect();
        const query = 'DELETE FROM empleados';
        await client.query(query);
        return 'All data deleted successfully.';
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
}

// Define routes
app.post('/insert-default-data', async (req, res) => {
    try {
        const message = await insertDefaultData();
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.get('/read-data', async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.delete('/delete-data/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = await deleteData(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.delete('/delete-all-data', async (req, res) => {
    try {
        const message = await deleteAllData();
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/read-data`);
})