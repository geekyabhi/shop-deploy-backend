const router=require('express').Router()
const { getProducts, getProductById }=require('../controllers/productController')

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

module.exports=router