const User = require("../models/User");
const Pet = require("../models/Pets");
const PetAdopted = require("../models/Adopted");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const verifyToken = require("./verifyToken");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  user.password = user.ConfigPassword(user.password);
  console.log(user);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({ error: error });
    }
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ error: "Email Inexistente" });
    }

    if (!user.MatchPassword(password, user.password)) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.AdoptedPetByUser = async (req, res, next) => {
  //Se verifica el id obtenido del token
  const USER = await User.findById(req.userId);
  if (!USER) {
    return res.status(404).json({ message: "No user found" });
  }

  //Del id obtenido de la URL se obtienen sus datos
  const pet = await Pet.findById(req.params.id);
  if (!pet) {
    return res.status(404).json({ message: "No pet Found" });
  }
  const namePet = pet.name;
  const edadPet = pet.edad;
  const especie = pet.especie;
  const genero = pet.genero;
  const raza = pet.raza;
  const nameUser = USER.name;
  const emailUser = USER.email;

  //Los datos se almacenan en el nuevo modelo
  const adopted = new PetAdopted({
    namePet,
    edadPet,
    especie,
    genero,
    raza,
    nameUser,
    emailUser,
  });

  await adopted.save();
  //Una ves almacenado los datos de esta mascota en el nuevo modelo, este se elimina del anterior modelo.
  await Pet.findByIdAndDelete(req.params.id);
};
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Algo Ocurrio mal :C",
      });
    }
    req.profile = user;
    next();
  });
};
// Sign up  asdasd
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
