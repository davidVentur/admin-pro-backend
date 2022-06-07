const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.status(200).json({
    ok: true,
    usuarios,
  });
};

const createUser = async (req, res = response) => {
  const { nombre, password, email } = req.body;

  try {
    //Verificar si un correo existe
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe en BD",
      });
    }

    const usuario = new Usuario(req.body);

    //Encrptar contarseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar usuario
    await usuario.save();

    res.status(200).json({
      ok: true,
      usuario: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = { getUsuarios, createUser };
