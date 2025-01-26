import userModel from "../models/userModel.js";


const addToCart = async (req,res) => {
    try {
        const {userId,itemId,size} = req.body;
        const userData =await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({success:false,message:"User not found"})
        }
        let cartData =await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({success:true,message:"Added to cart"})
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while adding to cart' });
    }
}

const getUserCart = async (req,res) => {
    try {
        const {userId} = req.body;
        const userData =await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({success:false,message:"User not found"})
        }
        let cartData =await userData.cartData;
        res.status(200).json({success:true,cartData})
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while get use from cart' });
    }
}

const updateCart = async (req,res) => {
    try {
        const {userId,itemId,size,quantity} = req.body;
        const userData =await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({success:false,message:"User not found"})
        }
        let cartData =await userData.cartData;
        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({success:true,message:"Updated to cart"})
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while updating to cart' });
    }
}

export { addToCart, getUserCart, updateCart };

