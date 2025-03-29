import express from 'express'
import { auth } from '../middleware/auth.js'
import { addToCart, deleteCartItem, getCartItem, updateCartItem } from '../controllers/CartController.js'


const router = express.Router()

router.get("/get",auth,getCartItem)
router.post("/add",auth,addToCart)
router.put("/update",auth,updateCartItem)
router.delete("/delete/:id",auth,deleteCartItem)


export default router