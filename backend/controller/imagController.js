const mongoose = require("mongoose");
const { UserModel } = require("../bdModel.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

var imagController = {};

imagController.saveImag = async function (req, res) {
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

  upload.single("imagen")(req, res, async function (err) {
    if (err) {
      console.log("Error " + err);
    } else {
      try {
        const relativePath = "imag/" + req.file.originalname;

        await UserModel.findOneAndUpdate(
          { email: req.body.email },
          { $set: { imag: relativePath } }
        );

        return res.json(relativePath);
      } catch (error) {
        console.log("Error al guardar la imagen: ", error);
      }
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
