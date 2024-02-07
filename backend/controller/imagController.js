const mongoose = require("mongoose");
const { UserModel } = require("../bdModel.js");
const fs = require("fs");

var imagController = {};

imagController.saveImag = async function (req, res) {
  try {
    const imag = fs.readFileSync(req.file.path);
    const imageBase64 = `data:${req.file.mimetype};base64,${imag.toString(
      "base64"
    )}`;

    await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: { imag: imageBase64 } }
    );
    res.json({ msj: "Imagen guardada" });
  } catch (error) {
    console.log("error " + error);
    res.status(409).json({ message: "Error al guardar la imagen" });
  }
};

module.exports = imagController;
