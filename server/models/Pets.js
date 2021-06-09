const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: 20,
    },
    edad: {
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
    foto: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pets", petSchema);
