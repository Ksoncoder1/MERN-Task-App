import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req,res,next) => {
    const { name, email, phone, password } = req.body;
    let isUser = null;
    if(!name || !email || !phone || !password){
        return next(res.status(400).json({
            success: false,
            message: 'Please fill the whole form'
        }))
    }

    isUser = await User.findOne({email});
    if(isUser){
        return res.status(400).json({
            success: false,
            message: 'User already exist'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, phone, password: hashedPassword});
    
    res.status(200).json({
        success: true,
        message: 'User registered succcessfully',
        
    })
}

export const login = async (req,res,body) => {
    const { email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
                success: false,
                message: 'Please fill in the whole form'
            });
    }

    const user = await User.findOne({ email });

    if(!user){
        return res.status(404).json({
                success: false,
                message: 'Invalid credentials'
            });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        return res.status(404).json({
                success: false,
                message: 'Invalid credentials'
            });
    }

    const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });

    res.status(200).cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
    }).json({
        success: true,
        message: 'User successfully logged in',
        user,
        token,
    });
}

export const getUser = async (req,res) => {
    //  const { id } = req.params;

     const user = await User.findById(req.user._id);
     if(!user){
        return res.status(200).json({
            success: false,
            message: 'User not found'
        })
     }

     res.status(200).json({
        success: true,
        user
     });
    
};

export const logout = async (req,res) => {
    res.status(200).cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: 'User logged out'
    })
}