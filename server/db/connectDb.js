import mongoose from "mongoose";


// DB connection
const connectDb = async (DB_URI) => {
    try {
        await mongoose.connect(DB_URI)
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;