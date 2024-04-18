import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username required"], unique: true },
    email: { type: String, required: [true, "Email required"], unique: true },
    password: { type: String, required: [true, "Password Required"] },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;