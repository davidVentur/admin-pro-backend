const response = require("express");
const Doctor = require("../models/doctor");

const getDoctors = async(req, res = response) => {

  const doctores = await Doctor.find().populate("usuario", "nombre email img").populate("hospital","nombre");
  res.json({
    ok: true,
    doctores
  });
};

const createDoctor = async (req, res = response) => {
  const uid = req.uid;
  const doctor = new Doctor({
    usuario: uid,
    ...req.body,
  });

  try {
    const doctorBD = await doctor.save();
    res.status(200).json({
      ok: true,
      msg: "Doctor guardado",
      doctorBD,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error",
      error,
    });
  }

  res.json({
    ok: true,
    msg: "Create Doctor",
  });
};

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Update Doctor",
  });
};

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Doctor",
  });
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
