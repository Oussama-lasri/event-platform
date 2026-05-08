import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadEventImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/image", authMiddleware, upload.single("image"), uploadEventImage);

export default router;
