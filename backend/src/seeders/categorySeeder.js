import Category from "../models/Category.js";

const seedCategories = async () => {
  const existing = await Category.countDocuments();

  if (existing > 0) {
    console.log("Categories already exist");
    return;
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
};

export default seedCategories;