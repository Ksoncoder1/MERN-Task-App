import jwt, { decode } from 'jsonwebtoken';
import User from '../models/userSchema.js';
export const isAuthenticated = async (req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({
            succcess: false,
            message: 'User not Authenticated',
        })
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
}