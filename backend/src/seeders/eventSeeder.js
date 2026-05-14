import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Event from "../models/Event.js";
import Category from "../models/Category.js";

dotenv.config();

connectDB();

const seedEvents = async () => {
  try {
    const existingEvents = await Event.find();
    if (existingEvents.length > 0) {
      console.log("Events already exist");
      process.exit();
    }

    const categories = await Category.find();
    if (categories.length === 0) {
      console.log("No categories found. Please seed categories first.");
      process.exit(1);
    }

    const events = [
      {
        title: "Tech Conference 2024",
        description: "A conference about the latest in technology",
        date: new Date("2024-06-15"),
        time: "10:00 AM",
        location: "Convention Center",
        maxParticipants: 200,
        status: "upcoming",
        categoryId: categories[0]._id, // Technology
      },
      {
        title: "Business Networking Event",
        description: "Connect with business professionals",
        date: new Date("2024-07-20"),
        time: "2:00 PM",
        location: "Hotel Ballroom",
        maxParticipants: 100,
        status: "upcoming",
        categoryId: categories[1]._id, // Business
      },
      {
        title: "Yoga Workshop",
        description: "Relax and rejuvenate with yoga",
        date: new Date("2024-08-10"),
        time: "9:00 AM",
        location: "Community Center",
        maxParticipants: 50,
        status: "upcoming",
        categoryId: categories[2]._id, // Health & Wellness
      },
      {
        title: "Online Learning Summit",
        description: "Explore the future of education",
        date: new Date("2024-09-05"),
        time: "11:00 AM",
        location: "Virtual",
        maxParticipants: 500,
        status: "upcoming",
        categoryId: categories[3]._id, // Education
      },
      {
        title: "Music Festival",
        description: "Enjoy live music from various artists",
        date: new Date("2024-10-12"),
        time: "6:00 PM",
        location: "Outdoor Park",
        maxParticipants: 1000,
        status: "upcoming",
        categoryId: categories[4]._id, // Entertainment
      },
    ];

    await Event.insertMany(events);
    console.log("Events seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default seedEvents();