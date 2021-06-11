const router=require('express').Router()
const { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts }=require('../controllers/productController')
const {protect,admin} =require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,createProductReview)

module.exports=router