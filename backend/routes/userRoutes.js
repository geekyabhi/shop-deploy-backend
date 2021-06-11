const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router=require('express').Router()

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/').post(registerUser)

module.exports=router