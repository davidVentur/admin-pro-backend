require("dotenv").config(); // leyendo las variables de entorno
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

//Crear servidor de express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

// base de datos
dbConnection();

//Rutas
app.use('/api/usuarios',require('./routes/usuarios')); // middleware


//muestra en cosola
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
