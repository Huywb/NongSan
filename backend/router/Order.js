import express from 'express'
import { auth } from '../middleware/auth.js'
import { addOrder, getAllOrder, getOrderById } from '../controllers/OrderController.js'


const router = express.Router()

router.post("/add",auth,addOrder)
router.get("/all",auth,getAllOrder)
router.get("/:id",auth,getOrderById)




export default router