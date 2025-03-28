import AddressModel from "../models/Address"


export const addAddress = async(req,res)=>{
    try {
        const userId = req.userId
        const { address_line , city, state, pincode, country,mobile } = req.body

        const newAddress = await AddressModel.create({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile
        })

        res.status(200).json({message:"Add new Address Success",success:true,error:false,data: newAddress})
    } catch (error) {
        console.log("Error [AddAddress controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}

export const updateAddress = async(req,res)=>{
    try {
        const userid = req.userId
        const { _id, address_line,city,state,country,pincode, mobile} = req.body

        const updateAdd = await AddressModel.findByIdAndUpdate({_id: _id,userId: userid},{
            ...(address_line && { address_line }),  
            ...(city && { city }),
            ...(state && { state }),  
            ...(country && { country }),
            ...(pincode && { pincode }),  
            ...(mobile && { mobile })
        })

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