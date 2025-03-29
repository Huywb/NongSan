import express from 'express'
import { auth } from '../middleware/auth.js'
import { addAddress, deleteAddress, getAddress, updateAddress } from '../controllers/AddressController.js'



const router = express.Router()

router.post("/add",auth,addAddress)
router.put("/update",auth,updateAddress)
router.delete("/:id",auth,deleteAddress)
router.get("/get",auth,getAddress)



export default router