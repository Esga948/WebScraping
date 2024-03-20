const mongoose = require("mongoose");
const { UserModel } = require("../bdModel.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

var imagController = {};

//config Multer
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    const dir = "./imag";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir + "/");
  },
  filename: function (req, res, cb) {
    cb(null, res.originalname);
  },
});
const upload = multer({ storage: storage });

imagController.saveImag = async function (req, res) {
  upload.single("imagen")(req, res, async function (err) {
    if (err) {
      console.log("Error " + err);
      return res.status(500).json({ msj: "Error al subir archivo" });
    }
    try {
      const relativePath = "imag/" + req.file.originalname;

      const user = await UserModel.findOne({ email: req.body.email });
      const exist = await UserModel.findOne({ imag: relativePath });
      if (exist) {
        return res.status(409).json({
          msj: "Ya existe un archivo con ese nombre, cambiele el nombre para poder subirlo",
        });
      }
      if (user.imag && user.imag != "") {
        fs.unlink(path.join(process.cwd(), user.imag), async (err) => {
          if (err) {
            console.log("Error al borrar la antigua imagen");
            console.log(err);
            return res.status(408).json({
              msj: "Error al borrar la antigua imagen",
            });
          }
          console.log("Imagen borrada correctamente");
          await UserModel.findOneAndUpdate(
            { email: user.email },
            { $set: { imag: relativePath } }
          );
          return res.json(relativePath);
        });
      } else {
        await UserModel.findOneAndUpdate(
          { email: user.email },
          { $set: { imag: relativePath } }
        );
        return res.json(relativePath);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  });
};

imagController.getUser = async function (req, res) {
  var email = req.params.email;
  try {
    const user = await UserModel.findOne({ email: email });
    const imag = user.imag;
    res.json(imag);
  } catch (err) {
    console.log(err);
  }
};

module.exports = imagController;
