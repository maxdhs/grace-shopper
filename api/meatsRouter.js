const express = require("express");
const {
  createMeat,
  updateMeat,
  getAllMeats,
  getMeatByStyle,
  getAllStyles,
  getMeatByAllSpecies,
  getMeatBySingleSpecies,
  getMeatById,
  deleteMeat,
} = require("../db");
const { adminRequired } = require("./admin");
const meatsRouter = express.Router();

meatsRouter.use((req, res, next) => {
  console.log("Requesting Meats");

  next();
});

//---------- Get Routes --------------//
meatsRouter.get("/", async (req, res) => {
  try {
    const meat = await getAllMeats();
    res.send(meat);
  } catch (error) {
    next(error);
  }
});

meatsRouter.get("/styles", async (req, res, next) => {
  try {
    const styles = await getAllStyles();
    res.send(styles);
  } catch (error) {
    next(error);
  }
});

meatsRouter.get("/styles/:style", async (req, res, next) => {
  try {
    const meat = await getMeatByStyle(req.params.style);
    res.send(meat);
  } catch (error) {
    next(error);
  }
});

meatsRouter.get("/species", async (req, res, next) => {
  try {
    const animal = await getMeatByAllSpecies();
    res.send(animal);
  } catch (error) {
    next(error);
  }
});

meatsRouter.get("/species/:type", async (req, res, next) => {
  try {
    const animalType = await getMeatBySingleSpecies(req.params.type);
    res.send(animalType);
  } catch (error) {
    next(error);
  }
});

//-----Post Routes-----//

meatsRouter.post("/", async (req, res, next) => {
  const { species, style, description, flavor, weight, price } = req.body;

  try {
    const newMeat = await createMeat({
      species,
      style,
      description,
      flavor,
      weight,
      price,
    });
    if (newMeat) {
      res.send(newMeat);
    }
  } catch (error) {
    next(error);
  }
});

//----Patch Routes-----//

meatsRouter.patch("/:meatId", async (req, res, next) => {
  try {
    const { meatId } = req.params;
    const { description, weight, price } = req.body;

    const newMeat = await updateMeat({
      id: meatId,
      description,
      weight,
      price,
    });

    if (newMeat) {
      res.send(newMeat);
    }
  } catch (error) {
    next(error);
  }
});

//----Delete Meat---//
meatsRouter.delete("/:meatId", async (req, res, next) => {
  try {
    const { meatId } = req.params;

    const meatDelete = await deleteMeat(meatId);
    res.send(meatDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = meatsRouter;
