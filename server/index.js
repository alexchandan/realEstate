import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import listingRoute from "./routes/listingRoute.js";
import connectDb from "./db/connectDb.js";
dotenv.config();

const app = express();

// Database connection
connectDb(process.env.MONGO_URI);

app.use(cors());


// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.use("/api/user", (req, res) => {
//     res.send("this is res from index.js");
// });
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute)


// middleware for handling error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(3000, () => {
    console.log("Server listening at port 3000");
});