import orderModel from "../models/orderModer.js"
import userModel from "../models/userModel.js"


// placing orders using COD Method
const placeOrder = async (req,res) => {
    try {
        const {userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:'Order Placed Successfully'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Orders data for admin
const allOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error); 
        res.json({success:false,message:error.message})
    }
}

// User order data for frontend
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error); 
        res.json({success:false,message:error.message})
    }
}

//Update order status for admin
const updateStatus = async (req,res) => {
    try {
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated Successfully'})
    } catch (error) {
        console.log(error); 
        res.json({success:false,message:error.message})
    }
}

export { allOrder, placeOrder, updateStatus, userOrders }
