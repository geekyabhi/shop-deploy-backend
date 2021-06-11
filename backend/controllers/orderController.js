const Order =require('../models/orderModel')
const asyncHandler=require('express-async-handler')
const Razorpay=require('razorpay')

const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const addOrderItems=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    // console.log(req.body)
    if(orderItems&&orderItems.length===0){
        res.status(400)
        throw new Error('No order Items')
        return
    }else{
        const amount=Math.ceil(totalPrice*100)
        console.log(amount)
        const options={
            amount:amount, 
            currency:"INR",
        }
        try{
            const razorpayOrder=await razorpay.orders.create(options)
            console.log(razorpayOrder)
            // console.log(razorpayOrder)
            const order=new Order({orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice,user:req.user._id,order_id:razorpayOrder.id})
            // console.log(order)
            const createdOrder=await order.save()
            console.log(createdOrder._id)
            res.status(201).json(createdOrder)
        }catch(e){
            console.log(e)
        }
    }
})

const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email ')
    if(order){
        res.json(order)
    }else{
        res.status(400)
        throw new Error('Order not found')
    }
})

const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true,
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
        }
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

const getMyOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    res.json(orders)
})

const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name')
    res.json(orders)
})

const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered=true,
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


module.exports={addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered}