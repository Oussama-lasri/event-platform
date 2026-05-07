import express from "express";

import {
  registerToEvent,
  cancelRegistration,
} from "../controllers/registrationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  registerToEvent
);

router.delete(
  "/:id",
  authMiddleware,
  cancelRegistration
);

export default router;