import express from 'express';
import { allOrder, placeOrder, updateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',authUser,placeOrder)


//user features
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter