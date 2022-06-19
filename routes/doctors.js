/*

Ruta " /api/doctors"

*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors");

const { validarCampo } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getDoctors);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe de ser valido").isMongoId(),
    validarCampo,
  ],
  createDoctor
);

router.put("/:id", [], updateDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;
