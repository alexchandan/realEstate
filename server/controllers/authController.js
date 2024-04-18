import User from "../models/User.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hassedPass = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, email, password: hassedPass });
        const result = await newUser.save();
        console.log(result);
        res.status(201).json("User created Successfully");
    } catch (error) {
        next(error);
        // next(errorHandler(550, "Error from the utils"));
    }
}