const express = require("express");
const router = express.Router();

const usuarioAppController = require("../controller/usuarioAppController.js");
const apiController = require("../controller/apiController.js");
const imagController = require("../controller/imagController.js");
const audiusController = require("../controller/audiusController.js");

router.post("/registerApp", usuarioAppController.createUser);
router.post("/loginApp", usuarioAppController.loginAppUser);
router.post("/authToken", usuarioAppController.authToken);
router.post("/authToken2", usuarioAppController.authToken2);
router.post("/reenviarTokenAuth", usuarioAppController.reenviarCorreoAuth);
router.post("/reenviarToken", usuarioAppController.reenviarCorreo);
router.post("/resetPass", usuarioAppController.resetPass);
router.post("/changeName", usuarioAppController.changeName);
router.post("/comparePass", usuarioAppController.comparePass);
router.post("/logout", usuarioAppController.logOut);

router.get("/getCollections", apiController.getCollections);
router.get("/datsT/:collectionName", apiController.datsT);

router.get("/trackAu", audiusController.trackAu);
router.get("/userAu", audiusController.userAu);

router.post("/saveImag", imagController.saveImag);
router.get("/getU/:email", imagController.getUser);

module.exports = router;
