import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import  User  from "../models/user.model.js";

const verifyJwt = asyncHandler(async (req, _res, next) => {
    try{
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){

            throw new apiError(404,"your token is not valid")
        }
        const decodedToken =  jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new apiError(400,"NO user found")
        }
        req.user = user
        next()            
    } catch (error){
        throw new apiError(400,error.message)
    }
})

export default verifyJwt