import express from 'express'
import { CreateProduct, deleteProduct, getProduct, getProductByCategory, getProductDetail, searchProduct, updateProduct } from '../controllers/ProductController.js'
import { auth } from '../middleware/auth.js'


const router = express.Router()

router.post('/add',auth,CreateProduct)
router.post('/get',getProduct)
router.post('/get-product-by-category',getProductByCategory)
router.post('/getbyid',getProductDetail)
router.put('/update',auth,updateProduct)
router.delete("/:id",deleteProduct)
router.get('/search',searchProduct)







export default router