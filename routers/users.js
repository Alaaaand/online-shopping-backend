import User from "../models/user.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

export default router;
