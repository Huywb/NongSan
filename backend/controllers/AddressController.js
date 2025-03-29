import AddressModel from "../models/Address.js"
import UserModel from "../models/User.js"


export const addAddress = async(req,res)=>{
    try {
        const userId = req.userId
        const { address_line , city, country,mobile } = req.body

        if(!address_line || !city || !country || !mobile){
            return res.status(400).json({message:"All fields are required",success:false,error:true})
        }

        if(!userId){
            return res.status(400).json({message:"Unauthorized",success:false,error:true})
        }

        const newAddress = await AddressModel.create({
            address_line,
            city,
            country,
            mobile,
            userId
        })

        if(!newAddress){
            return res.status(400).json({message:"Add new Address Unsuccess",success:false,error:true})
        }

        await UserModel.findByIdAndUpdate(userId,{
            $push : {address_details : newAddress._id}
        },{new:true})

        res.status(200).json({message:"Add new Address Success",success:true,error:false,data: newAddress})
    } catch (error) {
        console.log("Error [AddAddress controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}

export const updateAddress = async(req,res)=>{
    try {
        const userId = req.userId
        const { _id, address_line,city,country, mobile} = req.body

        if(!userId) {
            return res.status(400).json({message:"Unauthorized",success:false,error:true})
        }

        if(!_id){
            return res.status(400).json({message:"Address ID is required",success:false,error:true})
        }

        console.log("userid",userId)
        console.log("_id",_id)

        const existingAddress = await AddressModel.findOne({_id : _id,userId : userId})

        if(!existingAddress){
            return res.status(400).json({message:"Address not found",success:false,error:true})
        }

        const updateAdd = await AddressModel.findByIdAndUpdate({_id:_id},{
            ...(address_line && { address_line }),  
            ...(city && { city }),
            ...(country && { country }),
            ...(mobile && { mobile })
        },{new:true})

        res.status(200).json({message:"Update Address success",succes:true,error:false,data: updateAdd})
    } catch (error) {
        console.log("Error [updateAddress controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}

export const deleteAddress = async(req,res)=>{
    try {
        const userid = req.userId
        const {id} = req.params

        await AddressModel.findByIdAndDelete({_id:id,userId:userid})
        
        res.status(200).json({message:"Delete Address success",success:true,error:false})
    } catch (error) {
        console.log("Error [deleteAddress controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getAddress = async(req,res)=>{
    try {
        const userid = req.userId
        
        const allAddress = await AddressModel.find({userId : userid})

        res.status(200).json({message:"All address success",succes:true,erorr:false,data : allAddress})
    } catch (error) {
        console.log("Error [getAddress controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}