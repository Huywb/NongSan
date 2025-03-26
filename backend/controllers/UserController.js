import User from "../models/User";
import bcrypt from 'bcryptjs'

export const Login = async (req,res)=>{
    try {
        const {name,password,email} = req.body

        if(!name || !password || !email){
            return res.status(400).json({message:"All field arre required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not valid"})
        }

        const usercheck = await User.findOne({email})

        if(!usercheck){
            return res.status(400).json({message:"Account not valid"})
        }
        const checkPass = await bcrypt.compare(password,usercheck.password)
        if(!checkPass){
            return res.status(400).json({message:"Password not correct"})
        }

        res.status(200).json({message: "Login success",data: userc})
    
    } catch (error) {
        console.log("Error [Login controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}