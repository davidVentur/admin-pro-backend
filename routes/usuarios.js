/*
Ruta: /api/usuarios
*/

const { Router } = require("express");
const { getUsuarios, createUser } = require("../controllers/usuarios");
const router = Router();

router.get("/", getUsuarios);
router.post("/", createUser);

module.exports = router;
