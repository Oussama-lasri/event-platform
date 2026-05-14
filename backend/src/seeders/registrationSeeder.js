import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

dotenv.config();

connectDB();

const seedRegistrations = async () => {
  try {
    const existingRegistrations = await Registration.find();
    if (existingRegistrations.length > 0) {
      console.log("Registrations already exist");
      process.exit();
    }

    const users = await User.find({ role: "user" });
    const events = await Event.find();

    if (users.length === 0 || events.length === 0) {
      console.log("No users or events found. Please seed users and events first.");
      process.exit(1);
    }

    const registrations = [
      {
        userId: users[0]._id,
        eventId: events[0]._id,
        status: "confirmed",
      },
      {
        userId: users[1]._id,
        eventId: events[1]._id,
        status: "confirmed",
      },
      {
        userId: users[2]._id,
        eventId: events[2]._id,
        status: "confirmed",
      },
      {
        userId: users[0]._id,
        eventId: events[3]._id,
        status: "confirmed",
      },
    ];

    await Registration.insertMany(registrations);
    console.log("Registrations seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default seedRegistrations();