const jsonwebtoken = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  //leer el token
  const token = req.header("x-token");

  //validaciones token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
