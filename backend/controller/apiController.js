const mongoose = require("mongoose");
const { trackSchema } = require("../bdModel.js");

var apiController = {};

//funcion para conseguir el nombre de los generos
apiController.getCollections = function (req, res) {
  try {
    mongoose.connection.db.collection("TopGeneros")
      .find()
      .toArray()
      .then((generos) => {
        // Extraer solo los nombres de los géneros
        const generoNames = generos.map((genero) => genero.genero);

        mongoose.connection.db
          .listCollections()
          .toArray()
          .then((collections) => {
            const collectionNames = collections
              .map((collection) => collection.name)
              .filter((name) => generoNames.includes(name));

            // Devolver solo los nombres de las colecciones
            return res.json(collectionNames);
          })
          .catch((error) => {
            console.error("Error al obtener la lista de colecciones:", error);
            return res.status(408).json({ msj: "Error 408" });
          });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

//Funcion para conseguir el nombre de las canciones por cada genero
apiController.datsT = async function (req, res) {
  var collectionName = req.params.collectionName;
  try {
    //Creamos el modelo para cada tabla
    var CollectionModel = mongoose.model(
      collectionName,
      trackSchema,
      collectionName
    );
    CollectionModel.find()
      .then((tracks) => {
        return res.json(tracks);
      })
      .catch((error) => {
        console.error(
          `Error al consultar la colección ${collectionName}:`,
          error
        );
        return res.status(409).json({ msj: "Error 409" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

module.exports = apiController;
