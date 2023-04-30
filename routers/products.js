import Category from "../models/category.js";
import Product from "../models/products.js";
import { Router } from "express";
import mongoose from "mongoose";
const router = Router();

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = {category: req.query.categories.split(",")};
  }
  const productList = await Product.find(filter).populate(
    "category"
  );

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("invalid category ");
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  product = await product.save();
  if (!product)
    return res.status(500).send({ MESSAGE: "PRODuct cannot be created" });

  res.send(product);
  //   product
  //     .save()
  //     .then((createdProduct) => {
  //       res.status(201).json(createdProduct);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: err,
  //         success: false,
  //       });
  //     });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("invalid product id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("invalid category ");
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      image: req.body.image,
      countInStock: req.body.countInStock,
    },
    {
      new: true,
    }
  );

  if (!product) return res.status(500).send("the product can not be updated");

  res.send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "product is deleted" });
      } else {
        return res
          .status(404)
          .json({ sucess: false, message: "no product found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ sucess: false, error: err });
    });
});

router.get("/get/featured-product/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);
  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

export default router;
