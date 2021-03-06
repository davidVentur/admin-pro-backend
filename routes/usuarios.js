/*
Ruta: /api/usuarios
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usuarios");
const { validarCampo } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/",validarJWT, getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampo,
  ],
  createUser
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").isEmail(),
  ],
  updateUser
);

router.delete("/:id",validarJWT ,deleteUser);

module.exports = router;
