const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AdoptedPet = new mongoose.Schema({
  namePet: {
    type: String,
    require: true,
    maxlength: 20,
  },
  edadPet: {
    type: Number,
    require: true,
  },
  especie: {
    type: ObjectId,
    ref: "Category",
    require: true,
  },
  genero: {
    type: String,
    require: true,
  },
  raza: {
    type: String,
    maxlength: 20,
    default: "Desconocido",
  },
  nameUser: {
    type: String,
    maxlength: 12,
  },
  emailUser: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Adopted", AdoptedPet);
