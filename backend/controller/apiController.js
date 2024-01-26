const mongoose = require("mongoose");
const { trackSchema } = require("../bdModel.js");

var apiController = {};

apiController.getCollections = function (req, res) {
  try {
    mongoose.connection.db
      .listCollections()
      .toArray()
      .then((collections) => {
        const collectionNames = collections.map(
          (collection) => collection.name
        );

        // Filtrar las colecciones, excluyendo 'Users'
        const filteredCollectionNames = collectionNames.filter(
          (name) => name !== "Users"
        );

        // Devolver solo los nombres de las colecciones
        return res.json(filteredCollectionNames);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de colecciones:", error);
        return res.status(408).json({ msj: "Error 408" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

apiController.datsT = async function (req, res) {
  var collectionName = req.params.collectionName;
  try {
    var CollectionModel = mongoose.model(collectionName, trackSchema, collectionName);
    CollectionModel.find()
      .then((tracks) => {
        return res.json(tracks);
      })
      .catch((error) => {
        console.error(`Error al consultar la colección ${collectionName}:`, error);
        return res.status(409).json({ msj: "Error 409" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

module.exports = apiController;
