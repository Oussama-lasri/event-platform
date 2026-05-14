import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

connectDB();

const seedUsers = async () => {
  try {
    const existingUsers = await User.find({ role: "user" });
    if (existingUsers.length > 0) {
      console.log("Users already exist");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("user123", 10);

    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: hashedPassword,
        role: "user",
      },
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default seedUsers();