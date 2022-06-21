/*

ruta : api/uploads/

*/
const { Router } = require("express");
const { fileUpload, returnImage } = require("../controllers/uploads");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", validarJWT, fileUpload);
router.get("/:type/:image", returnImage);

module.exports = router;
