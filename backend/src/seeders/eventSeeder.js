import Event from "../models/Event.js";
import Category from "../models/Category.js";

const seedEvents = async () => {
  const existing = await Event.countDocuments();

  if (existing > 0) {
    console.log("Events already exist");
    return;
  }

  const categories = await Category.find();

  if (categories.length === 0) {
    console.log("No categories found");
    return;
  }

  const events = [
    {
      title: "Tech Conference 2024",
      description: "A conference about tech",
      date: new Date(),
      time: "10:00 AM",
      location: "Online",
      maxParticipants: 200,
      status: "upcoming",
      categoryId: categories[0]._id,
    },
  ];

  await Event.insertMany(events);
  console.log("Events seeded successfully");
};

export default seedEvents;