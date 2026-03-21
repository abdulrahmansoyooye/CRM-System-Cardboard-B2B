import mongoose from "mongoose"

import {env} from "./env"

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI!)
        console.log("✅  Database connected")
    } catch (error) {
        
        console.log("❌ Databse Connection Failed",error)
        process.exit(1)
    }
}