const Usuario = require("../models/usuario");

const getUsuarios = (req, res) => {
  res.json({
    ok: true,
    msg: "get Usuarios",
  });
};

const postUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario(req.body);

  await usuario.save();

  res.json({
    ok: true,
    usuario,
  });
};

module.exports = {
  getUsuarios,
  postUsuario,
};
