import asyncHandler from "express-async-handler";
import { db } from "../config/database.js";
const addDishGroup = asyncHandler(async (req, res) => {
  const { nhomHang } = req.body;
  const { email } = req.user;
  const exitstingGroup = await db.dishGroup.findOne({ nhomHang });

  if (exitstingGroup) {
    res.status(400);
    throw new Error("Nhóm hàng đã tồn tại");
  }

  const newDishGroup = {
    email,
    nhomHang,
  };
  await db.dishGroup.insertOne(newDishGroup);

  res.status(201).json({
    message: "Thêm nhóm hàng thành công ",
  });
});

const getDishGroup = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const getAll = await db.dishGroup.find({ email }).toArray();
  res.status(200).json(getAll);
});

const dishGroupController = {
  addDishGroup,
  getDishGroup,
};

export default dishGroupController;
