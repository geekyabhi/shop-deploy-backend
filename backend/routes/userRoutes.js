const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController')
const { protect,admin } = require('../middleware/authMiddleware')
const router=require('express').Router()

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,admin,updateUserProfile)
router.route('/').post(registerUser).get(protect,getUsers)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)

module.exports=router