const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
const router = express.Router();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
const { spawn } = require('child_process');

//configuracion base de datos
var port = "8080";
const url =
  "mongodb+srv://estelgarcesext:ZySSfXFqTDN2eKM4@cluster0.mrutfie.mongodb.net/WebScraping";

//middleware para parsear solicitudes JSON y URL encoded
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

//Ejecutar el script de python
/*
const python = spawn('python', ['./webScraping.py']);
// Maneja eventos de salida y error
python.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

python.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

python.on('close', (code) => {
  console.log(`El script se ha ejecutado con código ${code}`);
});
*/
//permiso para usar credenaciales de acceso desde el forntend
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//Habilitar el corse hablitar el acceso desde alguna url (localhost:8080)
app.use(cors());

//Sistema de sesion
app.use(
  session({
    secret: "clave",
    resave: false,
    saveUninitialized: false,
  })
);

//Rutas
router.use("/", routes);
app.use("/", router);

//conexión a la base de datos
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bd = mongoose.connection;
bd.on("error", (error) => {
  console.log("Error de conexion a la base de datos " + error);
});
bd.once("open", () => {
  console.log("Conexion con la base de datos");
});

//levantamos el servidor
app.listen(port, function () {
  console.log("Listening port: " + port);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error!");
});

