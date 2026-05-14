import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const existingAdmin =
      await User.findOne({
        email: "admin@gmail.com",
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists"
      );

      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log(
      "Admin created successfully"
    );

    console.log(admin);

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

export default seedAdmin();