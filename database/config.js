const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN);
    console.log("DB online");
  } catch (err) {
    console.log(err);
    throw new Error("Error al iniciar la BD");
  }
};

module.exports = {
  dbConnection: dbConnection,
};
