const mongoose = require("mongoose");

// Define el modelo para guardar los usuarios
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    rol: Number,
    token: String,
    imag: String,
  },
  { collection: "Users" }
);

userSchema.statics = {
  create: function (data) {
    const user = new this(data);
    return user.save();
  },
  login: function (query) {
    return this.find(query);
  },
};
const UserModel = mongoose.model("Users", userSchema);

//Define el schema para las canciones
const trackSchema = new mongoose.Schema({
  _id: String,
  imagen: String,
  cancion: String,
  artista: String,
});

module.exports = { UserModel, trackSchema };
