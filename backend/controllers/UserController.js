import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import generatedAccessToken from "../libs/GenerateAccessToken.js";
import genertedRefreshToken from "../libs/GenerateRefreshToken.js";
import uploadImageClodinary from "../libs/Cloudinary/Cloudinary.js";
import jwt from 'jsonwebtoken'

export const Login = async (req,res)=>{
    try {
        const {password,email} = req.body

        if(!password || !email){
            return res.status(400).json({message:"All field are required",error:true,success:false})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not valid",error: true, success:false})
        }

        const usercheck = await User.findOne({email})

        if(!usercheck){
            return res.status(400).json({message:"Account not valid",error:true,success:false})
        }

        if(usercheck.status !== "Active"){
            return res.status(400).json({message:"Contact to Admin",error:true,success:false})
        }

        const checkPass = await bcrypt.compare(password,usercheck.password)
        if(!checkPass){
            return res.status(400).json({message:"Password is incorrect",error:true,success:false})
        }

        const accessToken = await generatedAccessToken(usercheck._id)
        const refreshToken = await genertedRefreshToken(usercheck._id)


        const isProduction = process.env.NODE_ENV === "production";
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: "None"
        }

        res.cookie('accessToken',accessToken,cookieOptions)
        res.cookie('refreshToken',refreshToken,cookieOptions)

        res.status(200).json({message: "Login success",data: {usercheck,accessToken,refreshToken}})
    
    } catch (error) {
        console.log("Error [Login controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}

export const Register = async (req,res)=>{
    try {
        const {name,password,email} = req.body

        if(!name || !password || !email){
            return res.status(400).json({message:"All field are required",error:true,success:false})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not valid"})
        }

        const usercheck = await User.findOne({email})

        if(usercheck){
            return res.status(400).json({message:"Email already exists",error:true,success:false})
        }

        const Salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,Salt)

        const newUser = await User.create({
            name,
            password: hashPass,
            email
        })

        res.status(200).json({message: "Register success",data: newUser})
    
    } catch (error) {
        console.log("Error [Register controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}


export const LoginAdmin = async(req,res)=>{
    try {
        const {password,email} = req.body

        if(!password || !email){
            return res.status(400).json({message:"All field are required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not valid"})
        }

        const usercheck = await User.findOne({email})

        if(!usercheck || usercheck.role !== "Admin"){
            return res.status(400).json({ message: "Admin account not found" });
        }

        const checkPass = await bcrypt.compare(password,usercheck.password)
        if(!checkPass){
            return res.status(400).json({message:"Password not correct"})
        }

        res.status(200).json({message: "LoginAdmin success",data: usercheck})
    } catch (error) {
        console.log("Error [LoginAdmin controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})   
    }
}

export const RegisterAdmin = async (req,res)=>{
    try {
        const {name,password,email} = req.body

        if(!name || !password || !email){
            return res.status(400).json({message:"All field are required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not valid"})
        }

        const usercheck = await User.findOne({email})

        if(usercheck){
            return res.status(400).json({message:"Email already exists"})
        }

        const Salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,Salt)

        const newUser = await User.create({
            name,
            password: hashPass,
            email,
            role: "Admin"
        })

        res.status(200).json({message: "Register success",data: newUser})
    
    } catch (error) {
        console.log("Error [Register controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}

export const DeleteAdmin = async(req,res)=>{
    try {
        const {id} = req.params

        await User.findByIdAndDelete(id)

        res.status(200).json({message: "Delete success"})
    
    } catch (error) {
        console.log("Error [DeleteAdmin controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}


export const Logout = async(req,res)=>{
    try {
        const userid = req.userId
        console.log(userid)


        const isProduction = process.env.NODE_ENV === "production";
        const cookiesOption = {
            httpOnly : true,
            secure : isProduction,
            sameSite : "None"
        }

        res.clearCookie("accessToken",cookiesOption)
        res.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await User.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        res.status(200).json({message: "Logout success"})
    } catch (error) {
        
        console.log("Error [Logout controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}


export const uploadAvatar = async(req,res)=>{
    try {
        const userid = req.userId
        const image = req.file

        const upload = await uploadImageClodinary(image)

        const updateUser = await User.findByIdAndUpdate(userid,{
            avatar: upload.url
        })
        res.json({message:"Upload profile",data:{_id: userid,avatar: upload.url}})
    } catch (error) {
        console.log("Error [uploadAvatar controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}


export const updateUserDetails = async(req,res)=>{
    try {
        const userId = req.userId
        const {name,email,mobile,password} = req.body

        let hashPass = ''

        if(password){
            const salt = await bcrypt.genSalt(10)
            hashPass = await bcrypt.hash(password,salt)
        }

        const updateUser = await User.findByIdAndUpdate(userId,{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password : hashPass}),
        })

        if(!updateUser){
            return res.status(400).json({message:"Update user unsuccessfully",success:false,error:true})
        }

        res.status(200).json({message:"Update user Succesfully",error:false,success:true,data: updateUser})
    } catch (error) {
        console.log("Error [updateUserDetails controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}


export const refreshToken = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]

        if(!refreshToken){
            return res.status(400).json({message:"Invalid token",error:true,success:false})
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return res.status(400).json({message:"Token is Expired",error: true, success: false})
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const isProduction = process.env.NODE_ENV === "production";
        const cookiesOption = {
            httpOnly : true,
            secure : isProduction,
            sameSite : "None"
        }

        res.cookie("accessToken",newAccessToken,cookiesOption)

        res.status(200).json({message: "New Access Token generated",error:false,success:true,data: newAccessToken})
    } catch (error) {
        console.log("Error [RefreshToken controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}

export const userDetail = async(req,res)=>{
    try {
        const userId = req.userId

        console.log('1',userId)
        
        const user = await User.findById(userId).select('-password -refresh_token')

        console.log(user)

        res.status(200).json({message:"UserDetail success",error:false,success:true,data: user})
    } catch (error) {
        console.log("Error [UserDetail controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}