import asyncHandler from "express-async-handler";
import bcrypt, { hash } from "bcrypt";
import { db } from "../config/database.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  const exsittingUser = await db.users.findOne({ email });
  if (!exsittingUser) {
    res.status(400);
    throw new Error("Invaid credentials");
  }

  const isMatchedPassword = await bcrypt.compare(
    password,
    exsittingUser.password
  );
  if (!isMatchedPassword) {
    res.status(400);
    throw new Error("Password doesn't match");
  }
  const payload = {
    id: exsittingUser._id,
    email: exsittingUser.email,
    fullname: exsittingUser.tenNhaHang,
  };
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  res.json({
    message: "login successfully",
    accessToken: token,
  });
});

const fetchCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const currentUser = await db.users.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        password: 0,
      },
    }
  );

  if (!currentUser) {
    res.status(401);
    throw new Error("Unauthorized, please try again!");
  }

  res.json(currentUser);
});

const signup = asyncHandler(async (req, res) => {
  const { hoTen, tenNhaHang, sdt, email, password } = req.body || {};

  const existingUser = await db.users.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email đã tồn tại");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUsers = {
    hoTen,
    tenNhaHang,
    sdt,
    email,
    password: hashedPassword,
    createAt: new Date(),
    updateAt: new Date(),
  };

  await db.users.insertOne(newUsers);

  const createdUser = await db.users.findOne(
    { email },
    {
      projection: {
        password: 0,
      },
    }
  );

  res.status(200).json(createdUser);
});

export const AuthController = {
  login,
  fetchCurrentUser,
  signup,
};
