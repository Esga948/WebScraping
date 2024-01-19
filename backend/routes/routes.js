const express = require("express");
const router = express.Router();

const usuarioAppController = require("../controller/usuarioAppController.js");

router.post("/registerApp", usuarioAppController.createUser);
router.post("/loginApp", usuarioAppController.loginAppUser);
router.post("/authToken", usuarioAppController.authToken);
router.post("/reenviarToken", usuarioAppController.reenviarCorreo);

module.exports = router;
