const response = require("express");
const Doctor = require("../models/doctor");

const getDoctors = async (req, res = response) => {
  const doctores = await Doctor.find()
    .populate("usuario", "nombre email img")
    .populate("hospital", "nombre");
  res.json({
    ok: true,
    doctores,
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

const updateDoctor = async (req, res = response) => {
  const doctorId = req.params.id;
  const uid = req.uid;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor no encontrdo",
      });
    }

    const cambiosDoctor = {
      ...req.body,
      usuario: uid,
    };

    const doctorActualizado = await Doctor.findByIdAndUpdate(
      doctorId,
      cambiosDoctor,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Update Doctor",
      doctor: doctorActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar",
      error,
    });
  }
};

const deleteDoctor = async(req, res = response) => {
  const docotrId = req.params.id;

  try {
    const doctor = await Doctor.findById(docotrId);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor no encontrdo",
      });
    }

    await Doctor.findByIdAndDelete(docotrId);

    res.json({
      ok: true,
      msg: "Delete Doctor",
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
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
