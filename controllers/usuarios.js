const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const res = require("express/lib/response");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  //Paginacion
  const index = Number(req.query.index) || 0;
  const limit = Number(req.query.limit) || 50;
  // const usuarios = await Usuario.find({}, "nombre email role google")
  //   .skip(index)
  //   .limit(limit);

  // const totalUsers = await Usuario.count();

  const [usuarios, totalUsers] = await Promise.all([
    Usuario.find({}, "nombre email role google").skip(index).limit(limit),
    Usuario.count(),
  ]);

  res.status(200).json({
    ok: true,
    usuarios,
    uid: req.uid,
    totalUsers,
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

    //Generar JWT
    const token = await generarJWT(usuario.id);

    //Guardar usuario
    await usuario.save();

    res.status(200).json({
      ok: true,
      usuario: usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    //Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya exist un usuario con ese email",
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    req.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { getUsuarios, createUser, updateUser, deleteUser };

// Examplpe url for pagination http://localhost:3000/api/usuarios?index=13&limit=1
