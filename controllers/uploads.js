const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/updateImage");

const fileUpload = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  // Validar tipo
  const validTypes = ["hospitals", "doctors", "usuarios"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un doctor, usuario u hospital",
    });
  }

  //Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  //Procesar la imagen...
  const file = req.files.image;
  const nameShort = file.name.split(".");
  const extensionFile = nameShort[nameShort.length - 1];

  //Validar extencion
  const validExtensionc = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensionc.includes(extensionFile)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extencion permitida",
    });
  }

  //Generar nombre del archivo
  const nameFile = `${uuidv4()}.${extensionFile}`;

  //Path para guardar la imagen
  const path = `./uploads/${type}/${nameFile}`;

  // mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //Actualizar base de datos
    updateImage(type, id, nameFile);

    res.json({
      ok: true,
      msj: "File upload",
      nameFile,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  //imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathNoImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathNoImg);
  }

  // res.sendFile(pathImg);
};

module.exports = {
  fileUpload,
  returnImage,
};
