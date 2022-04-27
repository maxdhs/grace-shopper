const express = require("express");

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
const { requireUser, requireAdmin } = require("./utils");

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

//create a product - admin only
// Tested with postman and is working
productRouter.post("/", requireAdmin, async (req, res, next) => {
  const { title, designer, description, price, category, image, count } =
    req.body;
  try {
    const response = await createProduct({
      title,
      designer,
      description,
      price,
      category,
      image,
      count,
    });

    res.send(response);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// update a product - admin only
// Tested with postman and is working
productRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
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
    res.send(req.user);
  } catch (err) {
    throw error;
  }
});

// delete a product - admin only
// Tested with postman and is working
productRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
  const { productId: id } = req.params;

  try {
    const deletedProduct = await destroyProduct(id);
    res.send({ message: "Product deleted" });
    return;
  } catch (err) {
    next(err);
  }
});

module.exports = productRouter;
