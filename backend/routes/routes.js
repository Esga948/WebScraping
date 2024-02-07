const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const usuarioAppController = require("../controller/usuarioAppController.js");
const apiController = require("../controller/apiController.js");
const imagController = require("../controller/imagController.js");

router.post("/registerApp", usuarioAppController.createUser);
router.post("/loginApp", usuarioAppController.loginAppUser);
router.post("/authToken", usuarioAppController.authToken);
router.post("/authToken2", usuarioAppController.authToken2);
router.post("/reenviarTokenAuth", usuarioAppController.reenviarCorreoAuth);
router.post("/reenviarToken", usuarioAppController.reenviarCorreo);
router.post("/resetPass", usuarioAppController.resetPass);
router.post("/changeName", usuarioAppController.changeName)
router.post("/comparePass", usuarioAppController.comparePass);
router.post("/logout", usuarioAppController.logOut);

router.get("/getCollections", apiController.getCollections);
router.get("/datsT/:collectionName", apiController.datsT);

router.post("/saveImag", upload.single('imagen'), imagController.saveImag);

module.exports = router;
