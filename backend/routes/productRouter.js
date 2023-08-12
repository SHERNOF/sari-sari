import express, { application } from "express";
import Product from "../models/productModels.js";

const productRouter = express.Router();
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get("/", async (req, res) => {
  const product = await Product.findOne({ desc: req.params.desc });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found..." });
  }
});

productRouter.get("/", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found..." });
  }
});
export default productRouter;
