import express from "express";
import { updateUser } from '../controllers/userController.js';
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("hello this is from userRoute.js");
})

router.post("/update/:id", verifyUser,updateUser) 
export default router;


