// Importar las dependencias
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'bd_hospital_210562_1'
});

// Conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

// Crear una instancia de Express
const app = express();

app.use(cors({
    origin: "http://localhost:8080", // Origen permitido, puede ser un string o un arreglo de strings
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Cabeceras permitidas
  }));
  
// Ruta para obtener todas las personas
app.get('/personas', (req, res) => {
  const sql = 'SELECT * FROM personas';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
