import Order from "../models/order.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

export default router;
