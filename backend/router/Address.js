import express from 'express'
import { auth } from '../middleware/auth'
import { addAddress, deleteAddress, getAddress, updateAddress } from '../controllers/AddressController'



const router = express.Router()

router.post("/add",auth,addAddress)
router.put("/update",auth,updateAddress)
router.delete("/:id",auth,deleteAddress)
router.get("/",auth,getAddress)



export default router