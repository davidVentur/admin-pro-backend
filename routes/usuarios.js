/*
    Ruta: /api/usuarios
*/
//imports
const { Router } = require("express");
const { getUsuarios, postUsuario } = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsuarios);
router.post("/", postUsuario);

module.exports = router;
