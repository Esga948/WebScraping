const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const secretKey = "key";
const { UserModel } = require("../bdModel.js");

var usuarioAppController = {};

//Funcion para crear el usuario y guardarlo en la base de datos
usuarioAppController.createUser = async function (req, res) {
  const salt = bcrypt.genSaltSync(10);
  const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  var newUserApp = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    rol: 2,
    token: token,
    imag: "",
  };

  this.newUserApp = newUserApp;
  this.token = token;
  try {
    const user = await UserModel.findOne({ email: newUserApp.email });
    if (user) {
      return res
        .status(409)
        .json({ msj: "Ya existe un usuario con ese email" });
    } else {
      //const user = UserModel.create(newUserApp);
      const expiresIn = 24 * 60 * 60;
      const aToken = jwt.sign({}, secretKey, {
        expiresIn: expiresIn,
      });
      const dataUser = {
        name: newUserApp.name,
        email: newUserApp.email,
        aToken: aToken,
        expiresIn: expiresIn,
      };

      //envio del correo
      enviarCorreo(newUserApp.email, token);

      //enviamos la respuesta al front
      return res.json({ dataUser });
    }
  } catch (err) {
    console.error("Error: " + err);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Funcion para iniciar sesion y comprobaciones
usuarioAppController.loginAppUser = async (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await UserModel.findOne({ email: userData.email });
    if (!user) {
      console.error("No se ha encontrado el usuario");
      return res.status(409).json({ msj: "No se ha encontrado el usuario" });
    } else {
      const resultPass = bcrypt.compareSync(userData.password, user.password);
      if (resultPass) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: expiresIn,
        });

        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn,
        };
        return res.json({ dataUser });
      } else {
        return res.status(408).json({ msj: "Contraseña incorrecta" });
      }
    }
  } catch (err) {
    console.error("Error: " + err);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Funcion para enviar el correo electronico
function enviarCorreo(email, token) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Puerto para SSL
    secure: true, // Usar SSL  
    auth: {
      user: "esga948@vidalibarraquer.net",
      pass: "39471948S",
    },
  });

  //config correo
  const htmlTemp = fs.readFileSync("../backend/email.html", "utf-8");
  const htmlContent = htmlTemp.replace("{{token}}", token);

  let mailOptions = {
    from: "esga948@vidalibarraquer.net",
    to: email,
    subject: "Inicio de sesión",
    html: htmlContent,
  };

  //enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Token enviado");
    }
  });
}

//Funcion para reenviar el correo con el token a un usuario guardado en la base de datos
usuarioAppController.reenviarCorreo = async function (req, res) {
  const email = req.body.email;
  const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      console.error("No se ha encontrado el usuario");
      return res.status(409).json({ msj: "No se ha encontrado el usuario" });
    } else {
      await UserModel.findOneAndUpdate(
        { email: email },
        { $set: { token: token } }
      );
      enviarCorreo(email, token);

      return res.json({ msj: "Token enviado" });
    }
  } catch (error) {
    console.error("Error: " + err);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Funcion para reenviar el correo con el token a un usuario que aun no se ha guardado en la base de datos
usuarioAppController.reenviarCorreoAuth = async function (req, res) {
  const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  this.token = token;
  newUserApp = this.newUserApp;

  try {
    enviarCorreo(newUserApp.email, token);
    return res.json({ msj: "Token enviado" });
  } catch (error) {
    console.error("Error: " + err);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Verificar que el token guardado en el back es igual al que se ha enviado
usuarioAppController.authToken = async function (req, res) {
  const front = req.body.token;
  //const email = req.body.email;
  try {
    const tokens = front == this.token;
    if (tokens) {
      this.newUserApp.token = this.token;
      UserModel.create(this.newUserApp);
    }
    return res.json({ tokens });
  } catch (error) {
    console.error("Error: " + error);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Verificar que el token de la base de datos es igual al que se ha enviado
usuarioAppController.authToken2 = async function (req, res) {
  const front = req.body.token;
  const email = req.body.email;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ msj: "Usuario no encontrado" });
    } else {
      const tokens = front === user.token;
      return res.json({ tokens });
    }
  } catch (error) {
    console.error("Error: " + error);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//comparar contraseña del fornt con la de la base de datos
usuarioAppController.comparePass = async function (req, res) {
  const front = req.body.pass;
  const email = req.body.email;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ msj: "Usuario no encontrado" });
    } else {
      const comp = bcrypt.compareSync(front, user.password);
      return res.json({ comp });
    }
  } catch (error) {
    console.error("Error: " + error);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Cambiar la contraseña
usuarioAppController.resetPass = async function (req, res) {
  const email = req.body.email;
  const newPass = req.body.newPass;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPass, salt);

  try {
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    const expiresIn = 24 * 60 * 60;
    const aToken = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: expiresIn,
    });

    const dataUser = {
      name: user.name,
      email: user.email,
      aToken: aToken,
      expiresIn: expiresIn,
    };

    return res.json({ dataUser });
  } catch (error) {
    console.error("Error: " + error);
    return res.status(500).json({ msj: "Error del servidor" });
  }
};

//Funcion para cambiar el nombre del usuario
usuarioAppController.changeName = async function (req, res) {
  const email = req.body.email;
  const newName = req.body.newName;

  try {
    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { name: newName } },
      { new: true }
    );

    res.json({ msj: "Nombre actualizado" });
  } catch (error) {
    console.log("error " + error);
    res.status(409).json({ message: "Error al actualizar el nombre" });
  }
};

//Funcion para cerar sesion
usuarioAppController.logOut = function (req, res) {
  this.newUserApp = "";
  this.token = "";
};

module.exports = usuarioAppController;
