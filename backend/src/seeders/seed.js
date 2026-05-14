import User from "../models/User.js";
import Category from "../models/Category.js";
import Event from "../models/Event.js";

export async function seedAll() {
  // USERS
  const userExists = await User.findOne({ email: "admin@test.com" });

  if (!userExists) {
    await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "hashed_password_here",
      role: "admin"
    });
  }

  // CATEGORIES
  const categories = ["Tech", "Music", "Sports"];

  for (const name of categories) {
    const exists = await Category.findOne({ name });
    if (!exists) {
      await Category.create({ name });
    }
  }

  // EVENTS (optional)
  const eventExists = await Event.countDocuments();

  if (eventExists === 0) {
    await Event.create({
      title: "First Event",
      date: new Date(),
      category: "Tech",
      location: "Online"
    });
  }

  console.log("Seed completed");
}