import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required:true
            }
        }
    ]
},{
    timestamps : true
})

const OrderModel = mongoose.model('order',orderSchema)

export default OrderModel