const express = require("express");
const router = express.Router();

const usuarioAppController = require("../controller/usuarioAppController.js");
const apiController = require("../controller/apiController.js");

router.post("/registerApp", usuarioAppController.createUser);
router.post("/loginApp", usuarioAppController.loginAppUser);
router.post("/authToken", usuarioAppController.authToken);
router.post("/reenviarToken", usuarioAppController.reenviarCorreo);
router.post("/resetPass", usuarioAppController.resetPass);

router.get("/getCollections", apiController.getCollections);
router.get("/datsT/:collectionName", apiController.datsT);
module.exports = router;
