import User from "../models/User.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ $or: [{ username: email }, { email: email }] });
        console.log(validUser);
        if (!validUser) return next(errorHandler(404, "User not found."));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Password"));
        const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 180) }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


export const google = async (req, res, next) => {
    console.log("serverside google run");
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            const { password: pass, ...rest } = user._doc;

            res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 180) }).status(200).json(rest);

        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hassedPass = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hassedPass,
                avatar: req.body.photo,
            })

            console.log(newUser);
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 180) }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out");
    } catch (error) {
        next(error);

    }
}