const mongoose = require("mongoose");
const bcrytjs = require("bcrypt");
/*const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");*/

/* 
Nombre, Email, Contraseña, Inventario, Rol, Date
*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 12,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    } /*,
    inventory: {
      type: Array,
      default: [],
    },*/,
  },
  { timestamps: true }
);

userSchema.methods.ConfigPassword = async (password) => {
  return bcrytjs.hash(password, 10);
};

userSchema.methods.MatchPassword = function (password) {
  return bcrytjs.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
