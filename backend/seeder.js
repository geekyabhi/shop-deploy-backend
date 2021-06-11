const mongoose=require('mongoose')
const dotenv=require('dotenv')
const colors=require('colors')
const connectDB=require('./db/mongoose')
const products=require('./data/products')
const users=require('./data/user')
const User=require('./models/userModel')
const Product=require('./models/productModel')
const Order=require('./models/orderModel')

dotenv.config()
connectDB()

const importData=async()=>{
    try{
        await Order.deleteMany({})
        await User.deleteMany({})
        await Product.deleteMany({})

        const createdUsers=await User.insertMany(users)

        const adminUsers=createdUsers[0]._id
        
        const sampleProducts=products.map(product=>{
            return {...product,user:adminUsers}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported !'.green.inverse)
        process.exit()
    }catch(e){
        console.log(`Cant import data ${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData=async()=>{
    try{
        await Order.deleteMany({})
        await User.deleteMany({})
        await Product.deleteMany({})

        console.log('Data Destroyed !'.red.inverse)
        process.exit()
    }catch(e){
        console.log(`Cant import data ${e}`.white.inverse)
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}else{
    importData()
}
