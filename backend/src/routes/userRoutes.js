import express from "express";

import {
  getUsers,
  deleteUser,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
//   adminMiddleware,
  getUsers
);

router.delete(
  "/:id",
  authMiddleware,
//   adminMiddleware,
  deleteUser
);

export default router;