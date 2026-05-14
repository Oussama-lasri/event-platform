import connectDB from "../config/db.js";
import seedAdmin from "./adminSeeder.js";
import seedCategories from "./categorySeeder.js";
import seedEvents from "./eventSeeder.js";

export const seedAll = async () => {
//   await connectDB();

  await seedAdmin();
//   await seedCategories();
//   await seedEvents();

  console.log("All seeds completed");
};