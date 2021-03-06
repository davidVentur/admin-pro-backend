/*

Ruta " /api/hospitals"

*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");

const { validarCampo } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getHospitals);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampo,
  ],
  createHospital
);

router.put(
  "/:hospitalId",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampo,
  ],
  updateHospital
);

router.delete("/:hospitalId", validarJWT,deleteHospital);

module.exports = router;
