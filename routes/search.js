/*

ruta : api/search/

*/
const { Router } = require("express");
const { getSearch, getSearchByCollecion } = require("../controllers/search");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/:data", validarJWT, getSearch);
router.get("/collection/:table/:data", validarJWT, getSearchByCollecion);

module.exports = router;
