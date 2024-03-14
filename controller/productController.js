import asyncHandler from "express-async-handler";
import { db } from "../config/database.js";
import cloudinaryService from "../services/cloudinary.config.js";
import { ObjectId } from "mongodb";
const createDish = asyncHandler(async (req, res) => {
  const dishValue = JSON.parse(req.body.body);
  const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = dishValue;
  const { email } = req.user;
  const file = req.file;
  const exitstingDish = await db.dishes.findOne({ tenHang });

  if (exitstingDish) {
    res.status(400);
    throw new Error("Món ăn đã tồn tại");
  }
  if (file) {
    const uploadFile = await cloudinaryService.upLoadingSingleFile(file.path);
    const newDish = {
      // _id: id,
      email,
      maHangHoa,
      tenHang,
      nhomHang,
      loai,
      giaBan,
      giaVon,
      hinhAnh: uploadFile.url,
      idHinhAnh: uploadFile.id,
    };
    await db.dishes.insertOne(newDish);
  } else {
    const newDish = {
      // _id: id,
      email,
      maHangHoa,
      tenHang,
      nhomHang,
      loai,
      giaBan,
      giaVon,
      hinhAnh: "",
    };
    await db.dishes.insertOne(newDish);
  }

  res.status(200).json({
    message: "Thêm sản phẩm thành công",
  });
});

const getDish = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const getAllDish = await db.dishes.find({ email }).toArray();
  res.status(200).json(getAllDish);
});
const deleteDish = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const exitstingDish = await db.dishes.findOne({ _id: new ObjectId(id) });
  const { idHinhAnh } = exitstingDish;
  if (!exitstingDish) {
    return res.status(400).json({
      message: "Không tìm thấy món ăn",
    });
  }
  const deleteFIle = await cloudinaryService.deletingSingleFile(idHinhAnh);

  await db.dishes.deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({
    message: "Xóa món ăn thành công ",
  });
});
const updateDish = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const file = req.file;
  if (file) {
    const dishValue = JSON.parse(req.body.body);
    const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = dishValue;
    const exitstingDish = await db.dishes.findOne({ _id: new ObjectId(id) });
    if (!exitstingDish) {
      res.status(400).json({
        message: "Không tìm thấy món ăn",
      });
    }
    const uploadFile = await cloudinaryService.upLoadingSingleFile(file.path);
    console.log("cloud", uploadFile);
    const hinhAnh = uploadFile.url;
    const updatingDish = {
      ...(maHangHoa && { maHangHoa }),
      ...(tenHang && { tenHang }),
      ...(nhomHang && { nhomHang }),
      ...(loai && { loai }),
      ...(giaBan && { giaBan }),
      ...(giaVon && { giaVon }),
      ...(file && { hinhAnh }),
    };
    await db.dishes.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatingDish }
    );
    res.status(200).json({
      message: "Cập nhật món ăn thành công ",
    });
  } else {
    const dishValue = JSON.parse(req.body.body);

    const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon, hinhAnh } =
      dishValue;

    const exitstingDish = await db.dishes.findOne({ _id: new ObjectId(id) });

    if (!exitstingDish) {
      res.status(400).json({
        message: "Không tìm thấy món ăn",
      });
    }
    const updatingDish = {
      ...(maHangHoa && { maHangHoa }),
      ...(tenHang && { tenHang }),
      ...(nhomHang && { nhomHang }),
      ...(loai && { loai }),
      ...(giaBan && { giaBan }),
      ...(giaVon && { giaVon }),
      ...(file && { hinhAnh }),
    };
    await db.dishes.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatingDish }
    );
    res.status(200).json({
      message: "Cập nhật món ăn thành công ",
    });
  }
});
const menuController = {
  createDish,
  getDish,
  deleteDish,
  updateDish,
};

export default menuController;
