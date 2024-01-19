const mongoose = require("mongoose");

// Define el modelo para guardar los usuarios
const userSchema = new mongoose.Schema(
  {
    idSpoty: { type: String, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    rol: Number,
    token: String,
  },
  { collection: "UsersApp" }
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
const UserAppModel = mongoose.model("UsersApp", userSchema);

module.exports = { UserAppModel};
