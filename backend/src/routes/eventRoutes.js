import express from "express";

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createEvent
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
//   adminMiddleware,
  deleteEvent
);

export default router;