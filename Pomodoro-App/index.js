const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
// Importar el módulo database.js
const { crearSesion, obtenerSesiones, actualizarSesion, eliminarSesion } = require('./database');
const app = express();
const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor

// Configuración de conexión a la base de datos PostgreSQL
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pomo_db',
  password: '',
  port: 5432 // Puerto por defecto de PostgreSQL
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





// Definir las rutas de tu servidor Express y utilizar las funciones CRUD según sea necesario
app.post('/sesiones', async (req, res) => {
  try {
    const { duracion, fecha } = req.body;
    const nuevaSesion = await crearSesion(duracion, fecha);
    res.json(nuevaSesion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la sesión' });
  }
});




// Ruta para guardar una sesión en la base de datos
app.post('/guardar-sesion', (req, res) => {
  const { duracion, fecha } = req.body;

  // Query para insertar los datos de la sesión en la tabla correspondiente
  const query = 'INSERT INTO sesiones (duracion, fecha) VALUES ($1, $2)';

  pool.query(query, [duracion, fecha], (err, result) => {
    if (err) {
      console.error('Error al guardar la sesión:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Sesión guardada exitosamente');
      res.status(200).send('Sesión guardada exitosamente');
    }
  });
});

// Ruta para obtener todas las sesiones almacenadas en la base de datos
app.get('/sesiones', (req, res) => {
  // Query para obtener todas las sesiones ordenadas por fecha de manera descendente
  const query = 'SELECT * FROM sesiones ORDER BY fecha DESC';

  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener las sesiones:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Sesiones obtenidas exitosamente');
      res.status(200).json(result.rows);
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});

//obtenerSesiones(pool);