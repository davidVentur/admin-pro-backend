const express = require("express");
require('dotenv').config(); // leyendo las variables de entorno
const cors = require('cors');
const {dbConnection} = require('./database/config');

//Crear servidor de express
const app = express();
//configurar cors
app.use(cors());
// base de datos
dbConnection();

//Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msj: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puesrto " + process.env.PORT);
});
