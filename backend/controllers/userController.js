import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//  route for user login
const loginUser = async (req,res) => {
    
}

// route for user register

const registerUser = async (req,res)=> {
    try {
        const {name,email,password} = req.body;
        // Checking user already or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false,message:'User already exists'})
        }
        // Validating email format & strong password
        if(password.length < 8 ){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt);
        
            const newUser = new userModel({
                name,
                email,
                password:hashPassword
            })
            const user = await newUser.save()
            const token = createToken(user._id)
            res.json({success:true,token})



    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// route for admin login
const adminLogin = async (req,res)=> {

}

export { adminLogin, loginUser, registerUser };

