import express from "express";
import { createListing, deleteListing, updateListing } from '../controllers/listingController.js';
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();


router.post("/create-listing", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateListing);

export default router;