import mongoose from "mongoose"

import env from "./index"

export const connectDB = async () => {
    try {
        await mongoose.connect(env.database_url!)
        console.log("✅  Database connected")
    } catch (error) {
        
        console.log("❌ Databse Connection Failed",error)
        process.exit(1)
    }
}