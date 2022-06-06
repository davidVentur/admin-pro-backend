const express = require("express");
//VARIABLES DE ENTORNO(.env)
require("dotenv").config();
//CONECION A BD
const { dbConnection } = require("./database/config");

//CREAR EL SERVIDER DE EXPRESS
const app = express();

//CORS
const cors = require("cors");

//CONFIGURAR CORS
app.use(cors());

//BASE DE DATOS
dbConnection();
//RUTAS
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
