import CartProductModel from "../models/Cart.js"
import UserModel from "../models/User.js"


export const addToCart = async(req,res)=>{
    try {
        const userid = req.userId
        const {productId} = req.body

        if(!productId){
            return res.status(400).json({message:"Provide productId",success:false,error:true})
        }

        const checkItemCart = await CartProductModel.findOne({userId: userid,productId: productId})

        if(checkItemCart){
            return res.status(400).json({message:"Item already in cart"})
        }

        const cartItem = await CartProductModel.create({
            quantity: 1,
            userId: userid,
            productId: productId
        })

        const updateCartUser = await UserModel.updateOne({_id : userid},{
            $push: {
                shopping_cart: productId
            }
        })

        res.status(200).json({message:"Add item to cart success",success:true,error:false})
    } catch (error) {
        console.log("Error [AddToCart controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"}) 
    }
}

export const getCartItem = async(req,res)=>{
    try {
        const userId = req.userId

        if(!userId){
            return res.status(400).json({message:"Unauthorized",success:false,error:true})
        }
        
        const getAllCart = await CartProductModel.find({userId: userId}).populate("productId")

        res.status(200).json({message:"GetCartItem success",success:true,error:false,data : getAllCart})

    } catch (error) {
        console.log("Error [getCartItem controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateCartItem = async(req,res)=>{
    try {
        const userid = req.userId

        const {id,qty} = req.body
        
        if(!id || !qty){
            return res.status(400).json({message:"Required id and quantity",success:false,error:true})
        }

        const updateItem = await CartProductModel.findByIdAndUpdate({_id :id},{
            quantity:qty
        },{new:true})

        res.status(200).json({message:"Update Cart Item success",success:true,error:false,data: updateItem})

    } catch (error) {
        console.log("Error [updateCartItem controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteCartItem = async(req,res)=>{
    try {
        const {id} = req.params
        await CartProductModel.findByIdAndDelete(id)
        
        res.status(200).json({message:"Delete Cart Item success",success:true,error:false})
    } catch (error) {
        console.log("Error [deleteCartItem controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"}) 
    }
}