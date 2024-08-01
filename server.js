/*
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo para obtener datos
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ');
    res.json(result.rows);
  } catch (error) {
    console.error('Error ejecutando la consulta', error);
    res.status(500).send('Error en la consulta');
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
*/

const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgresql://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a/base_de_datos_1erintento')
const db = pgp('postgres://base_de_datos_1erintento_user:c1hAhfjFt87HP0tGev3NpqZJK2wbCURW@dpg-cqlmvglumphs7396v9a0-a:5432/base_de_datos_1erintento')


db.one('SELECT * AS value')
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })