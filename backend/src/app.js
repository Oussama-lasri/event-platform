import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import connectDB from "./config/db.js";

// import seedUsers from "./seeders/userSeeder.js";
// import seedCategories from "./seeders/categorySeeder.js";
// import seedEvents from "./seeders/eventSeeder.js";
// import seedRegistrations from "./seeders/registrationSeeder.js";
// import seedAdmin from "./seeders/adminSeeder.js";

dotenv.config();

// global.crypto = crypto;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/uploads", uploadRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // connect database
    await connectDB();

    // run seeders
    // await seedAdmin();
    // await seedUsers();
    // await seedCategories();
    // await seedEvents();
    // await seedRegistrations();

    // start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();