const fs = require("fs");
const Usuario = require("../models/usuario");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const eraseImage = (path) => {
  if (fs.existsSync(path)) {
    //borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, nameFile) => {
let oldPath = '';
  switch (type) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("El doctor no existe");
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      eraseImage(oldPath);

      doctor.img = nameFile;
      await doctor.save();
      return true;
      break;

    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("El hospital no existe");
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      eraseImage(oldPath);

      hospital.img = nameFile;
      await hospital.save();
      return true;
      break;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("El usuario no existe");
        return false;
      }

      oldPath = `./uploads/usuarios/${usuario.img}`;
      eraseImage(oldPath);

      usuario.img = nameFile;
      await usuario.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  updateImage,
};
