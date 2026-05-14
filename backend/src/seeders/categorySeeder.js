import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";

dotenv.config();

connectDB();

const seedCategories = async () => {
  try {
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      console.log("Categories already exist");
      process.exit();
    }

    const categories = [
      { name: "Technology" },
      { name: "Business" },
      { name: "Health & Wellness" },
      { name: "Education" },
      { name: "Entertainment" },
      { name: "Sports" },
      { name: "Arts & Culture" },
      { name: "Networking" },
    ];

    await Category.insertMany(categories);
    console.log("Categories seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default seedCategories();