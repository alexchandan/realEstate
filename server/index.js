import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import connectDb from "./db/connectDb.js";
dotenv.config();

const app = express();

// Database connection
connectDb(process.env.MONGO_URI);

app.use(cors());


// middleware
app.use(express.json());


app.use("/", authRoute);


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