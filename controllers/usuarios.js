const Usuario = require("../models/usuario");

const getUsuarios = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "get Usuarios",
  });
};

const createUser = async (req, res) => {
  const { nombre, password, email } = req.body;
  const usuario = new Usuario(req.body);

  await usuario.save();

  res.status(200).json({
    ok: true,
    usuario: usuario,
  });
};

module.exports = { getUsuarios, createUser };
