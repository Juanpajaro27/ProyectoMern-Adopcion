const express = require("express");
const router = express.Router();
const {
  userById,
  AdoptedPetByUser,
} = require("../controllers/authControllers");
const {
  getPets,
  createPets,
  deletePet,
  photo,
  petsById,
  verMas,
} = require("../controllers/petsControllers");
const verifyToken = require("../controllers/verifyToken");

router.get("/mascotas", getPets);
router.post("/createPets/:userId", createPets);
router.delete("/deletePet/:id", deletePet);
router.post("/adopted/:id", verifyToken, AdoptedPetByUser);
router.get("/foto/:petsId", photo);
router.get("/:petsId", verMas);
router.param("petsId", petsById);
router.param("userId", userById);
module.exports = router;
