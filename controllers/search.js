const { response } = require("express");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");

const getSearch = async (req, res = response) => {
  const data = req.params.data;
  const regEx = new RegExp(data, "i");

  const [usuarios, doctors, hospitals] = await Promise.all([
    Usuario.find({ nombre: regEx }),
    Doctor.find({ nombre: regEx }),
    Hospital.find({ nombre: regEx }),
  ]);

  res.status(200).json({
    ok: true,
    usuarios,
    doctors,
    hospitals,
  });
};

const getSearchByCollecion = async (req, res = response) => {
  const data = req.params.data;
  const table = req.params.table;
  const regEx = new RegExp(data, "i");
  let dataParams;

  switch (table) {
    case "doctors":
      dataParams = await Doctor.find({ nombre: regEx })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitals":
      dataParams = await Hospital.find({ nombre: regEx }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "users":
      dataParams = await Usuario.find({ nombre: regEx });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "la tabla tiene que ser doctors, hospitals, users",
      });
  }

  res.status(200).json({
    ok: true,
    result: dataParams,
  });
};

module.exports = { getSearch, getSearchByCollecion };
