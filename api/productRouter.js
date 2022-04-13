const express = require("express");
const { getProducts } = require("../db/products");
const { requireUser } = require("./utils");

const {
  getAllProducts,
  destroyProduct,
  getProductById,
  createProduct,
  updateProduct,
} = require("../db/products.js");
const client = require("../db/index");
const productRouter = express.Router();
productRouter.use(express.json());

//get all
// Tested with postman and is working
productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send({ products });
  } catch (error) {
    res.send(error);
  }
});

//get by ID
// Tested with postman and is working
productRouter.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  res.send({ product });
});

//create
// Tested with postman and is working
productRouter.post("/", async (req, res, next) => {
  const { title, designer, description, price, category, inventoryQuantity } =
    req.body;
  try {
    if (!req.user) {
      throw "Must be logged in to post";
    } else {
      userId = req.user.id;
      const {
        rows: [newProduct],
      } = await createProduct({
        title,
        designer,
        description,
        price,
        category,
        inventoryQuantity,
      });
      res.send(newProduct);
    }
  } catch (err) {
    next(err);
  }
});

//update
// Tested with postman and is working
productRouter.patch("/:productId", async (req, res, next) => {
  const { productId: id } = req.params;

  const { title, designer, description, price, category, count } = req.body;

  const updateFields = {
    id,
    title,
    designer,
    description,
    price,
    category,
    count,
  };

  try {
    const updatedProduct = await updateProduct(updateFields);
    res.send(updatedProduct);
    console.log(updatedProduct);
  } catch (err) {
    console.log(err);
    throw error;
  }
});

//delete
// Tested with postman and is working
productRouter.delete("/:productId", async (req, res, next) => {
  const { productId: id } = req.params;
  try {
    const deletedProduct = await destroyProduct(id);
    res.send("Product deleted");
    return;
  } catch (err) {
    next(err);
  }
});

module.exports = productRouter;
