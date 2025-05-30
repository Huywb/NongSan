import express from 'express'
import { Login, LoginAdmin, Logout, refreshToken, Register, RegisterAdmin, updateUserDetails, uploadAvatar, userDetail } from '../controllers/UserController.js'
import { auth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'


const router = express.Router()

//User
router.post('/register',Register)
router.post('/login',Login)
router.post('/logout',auth,Logout)
router.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
router.put('/update',auth,updateUserDetails)
router.post('/refresh-token',refreshToken)
router.get('/user-detail',auth,userDetail)


//Admin
router.post("/admin/login",LoginAdmin)
router.post("/admin/register",RegisterAdmin)

export default router