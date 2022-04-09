const express = require("express");
const { user } = require("pg/lib/defaults");
const { getProducts } = require("../db/products");
const { requireUser } = require('./utils');

const {
  getAllProducts,
  destroyProduct,
  getProductById,
  createProduct,
  updateProduct
} = require('../db/products.js');
const client = require("pg/lib/native/client");

const productRouter = express.Router();
productRouter.use(express.json());

//get all
productRouter.get("/", async (req, res) => {
  const products = await getAllProducts();
  console.log(products);
  res.send({ products });
});

//get by ID
productRouter.get("/:productId", async (req, res) => {
  const product = await getProductById();
  res.send({ product });
});

//create
productRouter.post('/', async (req, res, next) => {
  const { title,
    designer,
    description,
    price,
    category,
    inventoryQuantity } = req.body;
  try {
    if (!req.user) {
      throw 'Must be logged in to post';
    } else {
      userId = req.user.id;
      const {
        rows: [newProduct],
      } = await createProduct({ title,
        designer,
        description,
        price,
        category,
        inventoryQuantity })
      res.send(newProduct);
    }
  } catch (err) {
    next(err);
  }
});

//update
productRouter.patch('/productId', async (req, res, next) => {
const { title,
  designer,
  description,
  price,
  category,
  inventoryQuantity}= req.body;
  const { productId } = req.params;
  try {
  const { rows: [productId]} = await client.query(
    `
    SELECT * FROM products WHERE id = $1`,
    [productId]
  );
  const updateProduct = await updateProduct()
  } catch (err) {
    next(err);
  }
});
//delete
productRouter.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!req.user) {
      throw 'Must be logged in to post';
    } else {
      userId = req.user.id;

      const {
        rows: [product],
      } = await destroyProduct(id)
        



        res.send(product);
        return;
       
    }
  } catch (err) {
    next(err);
  }
});




module.exports = productRouter;
