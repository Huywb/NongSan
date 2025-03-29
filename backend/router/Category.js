import express from 'express'
import { AddCategory, deleteCategory, getCategory, updateCategory } from '../controllers/CategoryController.js'
import { auth } from '../middleware/auth.js'


const router = express.Router()

router.get('/',auth,getCategory)
router.post('/add',auth,AddCategory)
router.put('/update',updateCategory)
router.delete('/:id',deleteCategory)



export default router