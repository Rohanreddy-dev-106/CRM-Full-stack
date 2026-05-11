import mongoose from "mongoose";

async function MongoDBconnection() {
    const MONGO_URI =
        process.env.MONGODB_CONNECTION_STRING || process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error(
            "MongoDB URI is missing. Set MONGODB_CONNECTION_STRING or MONGO_URI in src/.env"
        );
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

export { MongoDBconnection };