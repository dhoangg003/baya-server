import { db } from "../config/database.js";
import asyncHandler from "express-async-handler";
const createTypeMenu = asyncHandler(async (req, res) => {
  const { loaiThucDon } = req.body;
  const { email } = req.user;
  const exitstingTypeMenu = await db.typeMenu.findOne({ loaiThucDon });
  if (exitstingTypeMenu) {
    res.status(400);
    throw new Error("Loại thực đơn đã tồn tại ");
  }

  const newTypeMenu = {
    email,
    loaiThucDon,
  };

  await db.typeMenu.insertOne(newTypeMenu);
  res.status(201).json({
    message: "Menu được tạo thành công ",
  });
});

const getAllTypeMenu = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const getAll = await db.typeMenu.find({ email }).toArray();

  res.status(200).json(getAll);
});
const typeMenuController = {
  createTypeMenu,
  getAllTypeMenu,
};

export default typeMenuController;
