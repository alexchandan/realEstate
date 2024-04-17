import express from "express";
import { signup } from "../controllers/authController.js";
const router = express.Router();

router.post("/create-user", signup);

export default router;