import CartProductModel from "../models/Cart.js"
import OrderModel from "../models/Order.js"



export const addOrder = async(req,res)=>{
    try {
        const userId = req.userId

        if(!userId){
            return res.status(400).json({message:"Unauthorized",success:false,error:true})
        }
        
        const CartItems = await CartProductModel.find({userId})

        if(!CartItems){
            return res.status(400).json({message:"Cannot find Cart of thi User",success:false,error:true})
        }

        if(CartItems.length === 0){
            return res.status(400).json({message:"Cart is empty"})
        }

        const newOrder = await OrderModel.create({
            userId,
            products: CartItems.map(item=>({
                productId: item.productId,
                quantity: item.quantity
            }))
        })

        if(newOrder){
            await CartProductModel.deleteMany({userId})
        }

        res.status(200).json({message:"Add new Order success",success:true,error:false,data : newOrder})


    } catch (error) {
        console.log("Error [addOrder controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}

export const getAllOrder = async(req,res)=>{
    try {
        const userId = req.userId
        let {page,limit} = req.query

        if(!page === 0){
            page = 1
        }

        if(limit === 0){
            limit = 10
        }

        const skip = (page -1) * limit

        const totalOrders = await OrderModel.countDocuments({ userId });
        const totalPages = Math.ceil(totalOrders / limit);

        const allOrder = await OrderModel.find({userId}).populate("products.productId").skip(skip).limit(limit).sort({createdAt: -1})

        if(allOrder.length === 0){
            return res.status(400).json({message:"Order is empty"})
        }

        res.status(200).json({message:"Get all Order success",success:true,error:false,data: allOrder})
        
    } catch (error) {
        console.log("Error [getAllOrder controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})   
    }
}

export const getOrderById = async(req,res)=>{
    try {
        const userId = req.userId
        const {id} = req.params

        const getOrder = await OrderModel.findOne({_id : id,userId}).populate("products.productId").populate("userId")

        if(!getOrder){
            return res.status(400).json({message:"Order not exists",success:false,error:true})
        }

        res.status(200).json({message:"Get Order by id success",success:true, error:false,data: getOrder})

    } catch (error) {
        console.log("Error [CreateProduct controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}