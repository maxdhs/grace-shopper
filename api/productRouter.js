const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../db/products");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await getProducts();
  res.send({ products });
});

productRouter.post("/", async (req, res) => {
  if (!req.user || !req.user.is_admin) {
    res.send({ error: "You are not authorized admin route." });
    return;
  }
  try {
    const product = await createProduct(req.body);
    res.send({ product });
  } catch (error) {
    res.send({ error: error.message });
  }
});

productRouter.patch("/:productId", async (req, res) => {
  if (!req.user || !req.user.is_admin) {
    res.send({ error: "You are not authorized admin route." });
    return;
  }
  try {
    const product = await updateProduct({
      ...req.body,
      id: req.params.productId,
    });
    res.send({ product });
  } catch (error) {
    res.send({ error: error.message });
  }
});

productRouter.delete("/:productId", async (req, res) => {
  if (!req.user || !req.user.is_admin) {
    res.send({ error: "You are not authorized admin route." });
    return;
  }
  try {
    const product = await deleteProduct(req.params.productId);
    res.send({ product });
  } catch (error) {
    res.send({ error: error.message });
  }
});

productRouter.post("/image", upload.single("file"), async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      path.join(__dirname, "../uploads", req.file.filename)
    );
    res.send({ image: response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;
