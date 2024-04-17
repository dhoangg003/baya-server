import asyncHandler from "express-async-handler";
import { db } from "../config/database.js";
import { ObjectId } from "mongodb";
const addOrder = asyncHandler(async (req, res) => {
  const { name, phoneNumber, address, cartItems, totalAmount, shopName } = req.body;

  try {
    // Kiểm tra xem cơ sở dữ liệu đơn hàng đã tồn tại chưa
    if (!db.order) {
      // Nếu không tồn tại, tạo cơ sở dữ liệu đơn hàng
      await createOrderCollection(); // Hàm này sẽ tạo cơ sở dữ liệu đơn hàng
    }

    // Tạo một đơn hàng mới trong cơ sở dữ liệu
    const newOrder = {
      name,
      phoneNumber,
      address,
      cartItems,
      totalAmount,
      shopName, // Thêm thông tin về shop vào đơn hàng
    };

    await db.order.insertOne(newOrder);

    res.status(201).json({
      message: "Đơn hàng được tạo thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi tạo đơn hàng",
      error: error.message,
    });
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { shopName } = req.query; // Lấy giá trị của shopName từ query parameter

  try {
    // Khởi tạo điều kiện tìm kiếm, nếu có shopName thì tìm theo shopName, nếu không thì không thêm điều kiện
    const condition = shopName ? { shopName } : {};

    // Lấy tất cả các đơn hàng từ cơ sở dữ liệu phù hợp với điều kiện tìm kiếm
    const orders = await db.order.find(condition).toArray();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy đơn hàng",
      error: error.message,
    });
  }
});
const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params; // Lấy orderId từ request parameters

  try {
    // Xóa đơn hàng từ cơ sở dữ liệu dựa trên orderId
    const result = await db.order.deleteOne({ _id:new  ObjectId(orderId) });

    if (result.deletedCount === 1) {
      res.status(200).json({
        message: "Đơn hàng đã được xóa thành công",
      });
    } else {
      res.status(404).json({
        message: "Không tìm thấy đơn hàng để xóa",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xóa đơn hàng",
      error: error.message,
    });
  }
});

const orderController = {
  addOrder,
  getOrder,
  deleteOrder,
  
};

export default orderController;

