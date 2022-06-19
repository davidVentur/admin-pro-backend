const response = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre email img");

  res.json({
    ok: true,
    hospitales,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });
  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
      error,
    });
  }
};

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Update Hospital",
  });
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Hospital",
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
