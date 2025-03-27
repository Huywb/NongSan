import express from 'express'
import { CreateProduct, deleteProduct, getProduct, getProductByCategory, getProductByCategoryAndSubCategory, getProductDetail, searchProduct, updateProduct } from '../controllers/ProductController.js'
import { auth } from '../middleware/auth.js'


const router = express.Router()

router.post('/create',auth,CreateProduct)
router.post('/get',getProduct)
router.post('/get-product-by-category',getProductByCategory)
router.post('/get-product-by-category-and-subcategory',getProductByCategoryAndSubCategory)
router.post('/get-product-details',getProductDetail)
router.put('/update-product',auth,updateProduct)
router.delete("/:id",deleteProduct)
router.get('/search',searchProduct)







export default router