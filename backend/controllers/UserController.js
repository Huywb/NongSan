import User from "../models/User";
import bcrypt from 'bcryptjs'

export const Login = async (req,res)=>{
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

        if(!usercheck){
            return res.status(400).json({message:"Account not valid"})
        }
        const checkPass = await bcrypt.compare(password,usercheck.password)
        if(!checkPass){
            return res.status(400).json({message:"Password is incorrect"})
        }

        res.status(200).json({message: "Login success",data: usercheck})
    
    } catch (error) {
        console.log("Error [Login controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}

export const Register = async (req,res)=>{
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
            role: "User"
        })

        res.status(200).json({message: "Register success",data: newUser})
    
    } catch (error) {
        console.log("Error [Register controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})        
    }
}

export const Update = async(req,res)=>{
    try {
        const {id} = req.params
        const {name,email,password} = req.body

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const Salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,Salt)

        const UpdateUser = await User.findByIdAndUpdate(id,{
            name,
            email,
            password:hashPass
        },{new:true})

        res.status(200).json({message:"Update User success",data: UpdateUser})
    } catch (error) {
        console.log("Error [Update controller]",error.message)
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

export const UpdateAdmin = async(req,res)=>{
    try {
        const {id} = req.params
        const {name,email,password} = req.body

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const Salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,Salt)

        const UpdateUser = await User.findByIdAndUpdate(id,{
            name,
            email,
            password:hashPass
        },{new:true})

        res.status(200).json({message:"Update User success",data: UpdateUser})
    } catch (error) {
        onsole.log("Error [Update controller]",error.message)
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
