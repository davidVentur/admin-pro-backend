const response = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitales = await Hospital.find().populate(
    "usuario",
    "nombre email img"
  );

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

const updateHospital = async (req, res = response) => {
  const hospitalId = req.params.hospitalId;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrdo",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      hospitalId,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Update Hospital",
      hospital: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar",
      error,
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const hospitalId = req.params.hospitalId;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrdo",
      });
    }

    await Hospital.findByIdAndDelete(hospitalId);

    res.json({
      ok: true,
      msg: "Delete Hospital",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar",
      error,
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
