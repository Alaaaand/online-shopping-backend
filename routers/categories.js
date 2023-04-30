import Category from "../models/category.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const categorytList = await Category.find();

  if (!categorytList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categorytList);
});
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "the category with the given id not found!" });
  }
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category) return res.status(404).send("the category can not be created");

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) return res.status(404).send("the category can not be created");

  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "category is deleted" });
      } else {
        return res
          .status(404)
          .json({ sucess: false, message: "no category found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ sucess: false, error: err });
    });
});

export default router;
