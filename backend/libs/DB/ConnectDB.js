import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGOOSE_URL){
    throw new Error(
        "Please provide MONGODB_URL in the .env file"
    )
}

export const ConectDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Connect DB")
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}
