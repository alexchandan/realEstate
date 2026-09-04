import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username required"], unique: true },
    email: { type: String, required: [true, "Email required"], unique: true },
    password: { type: String, required: [true, "Password Required"] },
    avatar: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;