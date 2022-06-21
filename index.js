const express = require("express");
//VARIABLES DE ENTORNO(.env)
require("dotenv").config();
//CONECION A BD
const { dbConnection } = require("./database/config");

//CREAR EL SERVIDER DE EXPRESS
const app = express();

//CORS
const cors = require("cors");

//LECTURA Y PARCEO DEL BODY
app.use(express.json());

//CONFIGURAR CORS
app.use(cors());

//Carpeta publica
app.use(express.static("public"));

//BASE DE DATOS
dbConnection();

//RUTAS
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/search", require("./routes/search"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
